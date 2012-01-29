// node query

function Selector (doc){
  this.document = doc||document;
};

Selector.prototype = { 

  select: function(selectorText) {
    var groups=selectorText.split(','), i=-1, group, found=[], nodes;
    while ((group=groups[++i])) {
      nodes=[this.document||document];
      group=group.trim();
      var path=group.split(' '), j=-1, part;
      while ((part=path[++j])) { 
        nodes=this.selectPart(nodes, part);
      }
      found.append(nodes);
    }
    return found.unique();
  },

  getNodes: function(obj) {
    if (obj.push) return obj;
    if (obj.split) return this.select(obj);
    return [obj];
  },

  getNode: function(obj) {
    return this.getNodes(obj)[0];
  },

  selectPart: function (nodes, selector) {
    var i=-1, symbol, attr, val, buffer='', tokens=[];
    while ((symbol=selector.charAt(++i))) {
      switch (symbol) {
        case '#': 
          if (i) tokens.push(buffer);
          buffer='';
          tokens.push('id'); 
          break;
        case '.': 
          if (i) tokens.push(buffer);
          buffer='';
          tokens.push('className'); 
          break;
        default : 
          if (!i) tokens.push('tagName'); 
          buffer+=symbol; 
          break;
      }
    }
    tokens.push(buffer);
    
    i=-1;
    while ((attr=tokens[++i]) && (val=tokens[++i])) {
      if (attr=='className') {
        nodes = this.filterByClass(nodes, val, i-1);
      } else {
        nodes = this.filterByAttribute(nodes, attr, val, i-1);
      }
    }
    
    return nodes;
  },

  getDescendants: function (nodes, includeRootNodes) {
    var node, results=[];
    for (var i=0, len=nodes.length; i<len; i++) {
      node=nodes[i];
      results.append(node.getElementsByTagName('*'));
      if (includeRootNodes) {
        results.push(node);
      }
    }
    return results;
  },

  filterByClass: function (nodes, value, includeRootNodes) {
    var results=[], desc=this.getDescendants(nodes, includeRootNodes);
    value=' '+value+' ';
    for (var i=0, len=desc.length; i<len; i++) {
      if (desc[i].hasClass(value)) {
        results.push(desc[i]);
      }
    }
    return results;
  },

  filterByAttribute: function (nodes, attribute, value, includeRootNodes) {
    var results=[], desc=this.getDescendants(nodes, includeRootNodes);
    for (var i=0, len=desc.length; i<len; i++) {
      if ((''+desc[i][attribute])==value) {
        results.push(desc[i]);
      }
    }
    return results;
  }

};

function select (query, doc){
  var selector = new Selector(doc);
  return selector.select(query);
};

