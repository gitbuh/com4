function hasClass(node, className) {
  var classes=(' '+node.className+' ').toLowerCase();
  return classes.indexOf(' '+className+' ') > -1;
}

function addClass(node, className) {
  if (hasClass(node, className)) return false;
  var c = node.className;
  node.className = c ? c + ' ' + className : className;
  return true;
}

function removeClass(node, className) {
  if (!hasClass(node, className)) return false;
  var classes=node.className.split(' '), newClasses=[], c;
  while (classes[0]) if ((c=classes.pop()) != className) newClasses.push(c);
  node.className = newClasses.join(' ');
  return true;
}

function toggleClass(node, className) {
  return addClass(node, className) || removeClass(node, className);
}

