var i=0, mod, key, mods=[
  require('./dom'), 
  require('./event'), 
  require('./oop'), 
  require('./xhr')
];

while (mod=mods[i++]) {
  for (key in mod) { 
    exports[key]=mods[i][key];
  }
}

