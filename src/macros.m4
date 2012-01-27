m4_changequote([_,_])m4_dnl
m4_define(require,  [_m4_esyscmd(
  if [ $1 ]; then
    . "$com4_path/include.sh"
    write_module $1
  else
    echo -n "[_[_require_]_]"
  fi
)_])m4_dnl
m4_define(GLOBAL,  [_m4_esyscmd(
  echo -n "$var_global"
)_])m4_dnl
