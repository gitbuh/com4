

/** shuffle

    Shuffle an array. 
    
    @see http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_.22inside-out.22_algorithm

    @param {Array} array Array to shuffle.
    @param {Object} rng Optional RNG. Defaults to Math.
    @return {Array} The original array, shuffled.
*/
function shuffle (array, rng) {
  var i = array.length, j, swap;
  if (!rng) rng = Math;
  while (--i) {
    j = rng.random() * (i + 1) | 0;
    swap = array[i];
    array[i] = array[j];
    array[j] = swap;
  }
  return array;
}

/** pushRand

    Insert a value into an array at a random index. The element 
    previously at that index will be pushed back onto the end. 
    
    @see http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm

    @param {Array} array Array to insert into.
    @param {Mixed} value Value to insert.
    @param {Object} rng Optional RNG. Defaults to Math.
    @return {Number} The new length of the array.
 
*/
function pushRand (array, value, rng) {
  var j = (rng || Math).random() * (array.length + 1) | 0;
  array.push(array[j]);
  array[j] = value;
  return array.length;
}


