// event handling

var dom=require('./dom');

function Listener (node, eventName, callback){
  var listener = this;
  this.node = node;
  this.eventName = eventName;
  this.callback = callback;
  this.callFirst = node[eventName];
  node[eventName] = function (event) { return listener.fire(event); }
  node[eventName].listener = this;
};

Listener.prototype.fire = function(event) {
  var result;
  if (this.callFirst) {
    result = this.callFirst.call(this.node, event);
  }
  if ((!this.callback) || (result===false)) { 
    return result;
  }
  return this.callback.call(this.node, event);
};

function on (node, eventName, callback, listeners) {
  if (!listeners) listeners=[]; 
  if (node.split) {
    node = dom.select(node);
  }
  if (node.push) { 
    for (var i=node.length; i--;) {
      on(node[i], eventName, callback, listeners);
    }
    return listeners;
  }
  if (eventName.indexOf(',') > -1) {
    eventName = eventName.split(',');
  }
  if (eventName.push) {
    for (var i=eventName.length; i--;) {
      on(node, eventName[i], callback, listeners);
    }
    return listeners;
  }
  var listener = new Listener(node, 'on'+str.trim(eventName), callback);
  listeners.push(listener);
  return listener;
};
