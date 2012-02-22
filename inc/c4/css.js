function css () {}

css.hasClass = function(node, className) {
  var classes=(' '+node.className+' ').toLowerCase();
  return classes.indexOf(' '+className+' ') > -1;
};

css.addClass = function(node, className) {
  if (css.hasClass(node, className)) return false;
  var c = node.className;
  node.className = c ? c + ' ' + className : className;
  return true;
};

css.removeClass = function(node, className) {
  if (!css.hasClass(node, className)) return false;
  var classes=node.className.split(' '), newClasses=[], c;
  while (classes[0]) if ((c=classes.pop()) != className) newClasses.push(c);
  node.className = newClasses.join(' ');
  return true;
};

css.toggleClass = function(node, className) {
  return addClass(node, className) || removeClass(node, className);
};

