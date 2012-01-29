get_options ()
{
  while getopts "i:o:g:m:I:th" opt; do
    
    case "$opt" in
      i)
        in_file="$OPTARG";;
      o)
        out_file="$OPTARG";;
      g)
        var_global="$OPTARG";;
      I)
        include="$OPTARG";; # TODO: -I / include dirs
      t)
        test_mode=1;;
      h)
        html=1;;
      m)
        var_main="$OPTARG";;
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

normalize_path ()
{
  echo "$(cd $(dirname "$1"); echo $PWD/$(basename "$1"))"
}

write_module ()
{

  if [ "`echo $1 | egrep '^\.\.?/'`" = "" ]; then
    path=$(normalize_path "$abs_path/$1.js")
  else
    path=$(normalize_path "$rel_path/$1.js")
  fi
  
  module_name=`abs_to_rel "$abs_path" "$path"`
  
  loaded=0
  old_path="$rel_path"
  rel_path=$( dirname "$path" )
  
  if [ "$2" = "inline" ]; then
    echo -n "`cat "$path"`"
    return
  fi
  
  count=0
  
  if [ $2 ]; then
    require="require";
  else
    require="[_require_]";
  fi
  
  for included in `cat $included_files`; do
    count=$(( $count + 1 ))
    if [ "$included" = "$path" ]; then
      count=$(( $count - 1 ))
      echo -n "$require($count)"
      return
    fi
  done
  
  tmp_file="$tmp_path/$count"
  
  if [ "$2" = "" ]; then
    echo -n "$require($count)"
  fi
  
  echo -n > "$tmp_file";
  echo "$path" >> "$included_files"

  echo "
//
// $module_name
//" >> "$tmp_file"

  
  if [ -e "$path" ]; then
  
    echo "function(require,module,exports){" >> "$tmp_file"
    m4 -P "$com4_path/macros.m4" "$path" >> "$tmp_file"
    echo "},"  >> "$tmp_file"
  
  else
  
    echo "0,// Module \"$module_name\" not found." >> "$tmp_file"
    echo "Warning: Module \"$module_name\" not found." >&2
  
  fi
  
  rel_path="$old_path"
}

# both $1 and $2 are absolute paths
# returns $2 relative to $1
abs_to_rel () 
{
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
