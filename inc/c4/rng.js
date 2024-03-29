
// random number generator

function RNG() {

}

RNG.prototype = {

  constructor: RNG,
  
  hashSalt: ' ',

  random: Alea(),

  seed: function() {
    this.random = Alea(arguments);
  },

  hash: function(string) {
    return '_'+(Mash()(string) * 0x100000000).toString(36);
  }

}

// From http://baagoe.com/en/RandomMusings/javascript/
// Johannes Baagøe <baagoe@baagoe.com>, 2010
// Slightly modified to pacify linters.
function Mash() {
  var n = 0xefc8249d;

  function mash(data) {
    data = data.toString();
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  }

  mash.version = 'Mash 0.9.c4-1';
  return mash;
}

// From http://baagoe.com/en/RandomMusings/javascript/
// Johannes Baagøe <baagoe@baagoe.com>, 2010
// Slightly modified to pacify linters.
function Alea() {
  return (function(args) {
    var mash = Mash(), 
        s0 = mash(' '), 
        s1 = mash(' '), 
        s2 = mash(' '),
        c = 1,
        i;

    if (!args.length) {
      args = [+new Date()];
    }

    for (i = 0; i < args.length; i++) {
      s0 -= mash(args[i]);
      if (s0 < 0) {
        s0 += 1;
      }
      s1 -= mash(args[i]);
      if (s1 < 0) {
        s1 += 1;
      }
      s2 -= mash(args[i]);
      if (s2 < 0) {
        s2 += 1;
      }
    }
    mash = null;

    function random() {
      var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
      s0 = s1;
      s1 = s2;
      return (s2 = t - (c = t | 0));
    }
    random.uint32 = function() {
      return random() * 0x100000000; // 2^32
    };
    random.fract53 = function() {
      return random() + 
        (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
    };
    random.version = 'Alea 0.9.c4-1';
    random.args = args;
    return random;

  } (Array.prototype.slice.call(arguments)));
}


