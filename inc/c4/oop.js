/** declare

    Create a prototype object and return its constructor.
    
    @param {Function|Object} declaration
*/
function declare (declaration) {
  if (!declaration) {
    declaration = {};
  }
  else if (declaration.call) {
    declaration.prototype=proto;
    declaration.prototype[dataKey]={};
  }
  return getCtor(declaration);
}


var Clone = new Function(), // dummy function for prototypal cloning
      
    /** dataKey

        The name of the property where declaration objects' 
        metadata will be stored. If you want to pass objects to declare 
        instead of functions, put the metadata (parent, partial, etc.) 
        in this property.
    */
    dataKey = 'declare-data',
    
    /** proto

        This object is used as a prototype for declaration objects,
        so all properties are available as properties of `this`
        inside the body of each declaration function.

    */
    proto = {

      /** extend

          Perform prototypal inheritance by calling `this.extend(ParentCtor)`
          within your decalration function.

          @param {Function} ctor to extend.

          @return {Object} prototype of parent ctor.
      */
      extend: function (ctor) { 
        return (this[dataKey].extend=ctor).prototype; 
      },

      /** augment

          Finish a partial declaration.
          TODO: test for bugs, possibly retroactively fix child classes when augmenting parent.

          @param {Function} ctor to augment.

          @return {Object} prototype of partial ctor.
      */
      augment: function (ctor) { 
        return (this[dataKey].augment=ctor).prototype; 
      }

    };


/** setDataKey

    Sets the name of the property where declaration objects' 
    metadata will be stored. If you want to pass objects to declare 
    instead of functions, put the metadata (parent, partial, etc.) 
    in this property.
    
    @param {String} String value to use for dataKey
*/
declare['setDataKey'] = function (value) { dataKey=value; };

/** clone

    Create a copy of a simple object.
    
    @param {Object} obj
    
    @return {Object} clone of obj.

*/
function clone (object) {
  return new Clone(Clone.prototype=object);
};

/** merge

    Merge src object's properties into target object.
    
    @param {Object} target object to merge properties into.
    
    @param {Object} src object to merge properties from.
    
    @return {Object} target for chaining.

*/
function merge (target, src) { 
  for (var k in src) {
    if (src.hasOwnProperty(k) && k!='prototype' && k!=dataKey) {  
      target[k] = src[k];
    }
  }
  return target;
};

/** wrap

    Generate wrapper for parent constructor.
    
    @param {Function} parent constructor to wrap.
    
    @return {Function} child constructor.

*/
function wrap (parent) {
  return function(){ parent.apply(this, arguments); };
};

/** getCtor

    Prepare a constructor to be returned by declare.
    
    @param {Function|Object} declaration
    
    @return {Function} constructor.

*/
function getCtor (declaration) {    
  var oldProto,
      declFn = declaration.call ? declaration : null,
      declObj = declFn ? new declFn(declFn) : declaration, 
      data = declObj[dataKey] || {},
      parent = data.extend, partial = data.augment, 
      ctor =  // user-defined ctor 
              declObj.hasOwnProperty('constructor') ? declObj.constructor : 
              // ctor already defined (partial)  
              partial ? partial : 
              // generated wrapper for parent ctor
              parent ? wrap(parent) : 
              // generated empty function
              new Function('"declare empty ctor";'); 
  
  // If there's a parent constructor, use a clone of its prototype
  // and copy the properties from the current prototype.
  // Also copy properties from parent constructor to the child (static members).
  if (parent) {
    oldProto = merge(ctor, parent).prototype;
    ctor.prototype = clone(parent.prototype);
    merge(ctor.prototype, oldProto);
  }
  
  // Merge the declaration function's properties into the constructor.
  // This allows adding properties to `this.constructor` in the declaration function
  // without defining a constructor, or before defining one.
  merge(ctor, declFn);
  
  // Merge the declaration object's properties into the prototype.
  merge(ctor.prototype, declObj);
  
  // Have the constructor reference itself in its prototype, and return it.
  return (ctor.prototype.constructor=ctor);
};

