get_options () {

  fail=0

  while getopts "i:o:thm:I:a:p:l:" opt; do
    
    case "$opt" in
      i)
        in_file="$OPTARG"
        ;;
      o)
        out_file="$OPTARG"
        ;;
      h)
        html=1
        ;;
      m)
        var_main="$OPTARG"
        ;;
      I)
        include="$OPTARG $com4_includes"
        ;;
      a)
        ext_append="$OPTARG"
        ;;
      p)
        ext_prepend="$OPTARG"
        ;;
      l)
        linked_file="$OPTARG"
        ;;
      [?])
        fail=1;;
    esac

  done

  if [ "$in_file" = "" ]; then
    echo >&2 "$0: No input file specified."
    fail=1
  fi

  if [ "$out_file" = "" ]; then
    echo >&2 "$0: No output file specified."
    fail=1
  fi

  if [ $fail != 0 ]; then
    echo >&2 "$usage"
    exit $fail
  fi
}

resolve_path () {

  if [ "$2" = "" ]; then
    ext=".js"
  else
    ext=""
  fi

  # absolute path
  if [ "$(echo $1 | egrep '^\.\.?/')" = "" ]; then
  
    # always try main module's directory first
    path="$(normalize_path "$abs_path/$1$ext")"
    
    # if it's not packaged with the main module, check include paths
    if [ ! -e "$path" ]; then
    
      for inc in $include; do
        path="$(normalize_path "$inc/$1$ext")"
        
        if [ -e "$path" ]; then
          echo -n "$path"
          return
        fi
        
      done
    
    fi
    
  # relative path, don't check includes
  else
  
    path="$(normalize_path "$rel_path/$1$ext")"
    
  fi
  
  echo -n "$path"
}

normalize_path () {
  echo "$(cd $(dirname "$1") > /dev/null 2>&1; echo $PWD/$(basename "$1"))"
}

import_file () {
  path="$(resolve_path "$1")"
  echo -n "$(cat "$path")"
}

get_header_path () {
  echo "$(dirname "$1")/$(basename "$1" .js).$ext_prepend"
}

get_footer_path () {
  echo "$(dirname "$1")/$(basename "$1" .js).$ext_append"
}

write_module () {

  path="$(resolve_path "$1")"
  
  module_name=`abs_to_rel "$abs_path" "$path"`
  
  if [ $2 ]; then
    require="require";
  else
    require="|COM4_LQ|require|COM4_RQ|";
  fi
  
  if [ ! -e "$path" ]; then
    echo "Warning: Module \"$1\" not found." >&2
    echo -n "$require(-1)"
    return
  fi
  
  echo "<script src=\"$path\"></script>" >> "$linked_file"
  
  count=0
  
  for included in `cat $included_files`; do
    count=$(( $count + 1 ))
    if [ "$included" = "$path" ]; then
      count=$(( $count - 1 ))
      echo -n "$require($count)"
      return
    fi
  done
  
  tmp_file="$tmp_path/$count"
  old_path="$rel_path"
  rel_path=$( dirname "$path" )
  note=""
  
  echo -n > "$tmp_file";
  echo "$path" >> "$included_files"
  
  if [ "$2" = "" ]; then
    echo -n "$require($count)"
    echo ", " >> "$tmp_file"
  else
    note="(main module)"
  fi
  
  echo "function (require, module, exports) {" >> "$tmp_file"
  
  header="$(get_header_path "$path")"
  footer="$(get_footer_path "$path")"
  
  if [ -e "$header" ]; then  
    echo "
//
//  Module $count header: $(abs_to_rel "$abs_path" "$header")
//" >> "$tmp_file"
    m4 -P "$com4_path/macros.m4" "$header" >> "$tmp_file"
  fi
  
  echo "
//
//  Module $count: $module_name $note
//" >> "$tmp_file"

  m4 -P "$com4_path/macros.m4" "$path" >> "$tmp_file"
  
  if [ -e "$footer" ]; then
    echo "
//
//  Module $count footer: $(abs_to_rel "$abs_path" "$footer")
//" >> "$tmp_file"
    m4 -P "$com4_path/macros.m4" "$footer" >> "$tmp_file"
  fi
  
  echo -n "
//  Module $count end.
}"  >> "$tmp_file"
  
  
  rel_path="$old_path"
}

# both $1 and $2 are absolute paths
# returns $2 relative to $1
abs_to_rel ()  {
  source=$1
  target=$2

  common_part=$source
  back=
  while [ "${target#$common_part}" = "${target}" ]; do
    common_part=$(dirname $common_part)
    back="../${back}"
  done

  echo ${back}${target#$common_part/}
}

# filters

url_encode () { 
  sed ' s/ /%20/g;
        s/!/%21/g;
        s/"/%22/g;
        s/#/%23/g;
        s/\$/%24/g;
        s/\&/%26/g;
        s/'\''/%27/g;
        s/(/%28/g;
        s/)/%29/g;
        s/:/%3A/g'
}

url_decode () {
  sed -e's/%\([0-9A-F][0-9A-F]\)/\\\\\x\1/g' | xargs echo -e
}

stringify_text () {

sed 's/\\/\\\\\\\\/g ; s/"/\\"/g ; s/^/"/ ; s/$/\\\\n" +/ ; $s/..$// '

}
