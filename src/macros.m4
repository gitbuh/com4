m4_changequote(|COM4_LQ|,|COM4_RQ|)m4_dnl
m4_define(require, |COM4_LQ|m4_esyscmd(|COM4_LQ|

  # require
  #
  # Inlcude other modules.
  # $1: Path to module to include.
  
  if [ $1 ]; then
    . "$com4_path/include.sh"
    write_module $1
  else
    echo -n "|COM4_LQ|require|COM4_RQ|"
  fi
  
|COM4_RQ|)|COM4_RQ|)m4_dnl
m4_define(COM4_IMPORT, |COM4_LQ|m4_esyscmd(|COM4_LQ|

  # COM4_IMPORT
  #
  # Include a non-module javascript file inline.
  # $1: Path to script to inline.

  . "$com4_path/include.sh"
  import_file $1
  
|COM4_RQ|)|COM4_RQ|)m4_dnl
m4_define(COM4_EXPORT, |COM4_LQ|m4_esyscmd(|COM4_LQ|

  # COM4_EXPORT
  #
  # Export an individual value.
  # $1: Identifier to export.
  # $2: Optional property name in exports object.

  if [ $2 ]; then
   echo -n "(exports[$2]=$1)"
  else
   echo -n "(exports[\"$1\"]=$1)"
  fi
  
|COM4_RQ|)|COM4_RQ|)m4_dnl
m4_define(COM4_EXPORT_PROPS, |COM4_LQ|m4_esyscmd(|COM4_LQ|

  # COM4_EXPORT_PROPS
  #
  # Export all properties of an object.
  # $1: Object to export.

  echo -n "(for (var __key__ in $1) exports[__key__]=$1[__key__])"
  
|COM4_RQ|)|COM4_RQ|)m4_dnl
m4_define(COM4_BASE64_ENCODE, |COM4_LQ|m4_esyscmd(|COM4_LQ|

  # COM4_BASE64_ENCODE
  #
  # Encode a file as base64 and output a string literal.
  # $1: MIME type, for example "image/png".
  # $2: Path to file.

  echo -n "\"data:$1;base64,`cat $2 | base64 -w 0`\""
  
|COM4_RQ|)|COM4_RQ|)m4_dnl
m4_define(COM4_STRINGIFY, |COM4_LQ|m4_esyscmd(|COM4_LQ|

  # COM4_STRINGIFY
  #
  # Format a text file as a javascript string literal.
  # $1: Path to file.

  . "$com4_path/include.sh"
  
  path="`resolve_path $1 1`"
  echo -n "(`cat $path | stringify_text`)"
  
|COM4_RQ|)|COM4_RQ|)m4_dnl
m4_define(COM4_URL_ENCODE, |COM4_LQ|m4_esyscmd(|COM4_LQ|

  # COM4_URL_ENCODE
  #
  # URL encode a string literal.
  # $1: String to URL encode.

  echo -n "\"`cat $1 | url_encode`\""
  
|COM4_RQ|)|COM4_RQ|)m4_dnl
