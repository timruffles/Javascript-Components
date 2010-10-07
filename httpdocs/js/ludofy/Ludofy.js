dojo.provide('ludofy.Ludofy');
(function(r) {
    r('dojox.data.CouchDBRestStore');
    r('dojox.wire');
})(dojo.require);
/*(function() {
 
   function includeRecurse(modules,context) {
    // recurse though: if it's an object, include its sub types, if an array, iterate over each with contest, if a string, just require with context
    if(context === undefined) {
      context = [];
    } else {
      context = [context];
    }
    switch (modules) {
    case dojo.isArray(modules):
      dojo.forEach(modules,function(module){includeResurse(module,context);});
      break;
    case dojo.isObject(modules):
      for(module in modules)
	{
	  dojo.isString(modules[module]) ? includeRecurse(,(context + module).join('.'));
      }
    break;
    case dojo.isString(modules):
      dojo.require((context + module).join('.'));
      break;
    }
  }

  var required = {'dojox':{'wire':null,'data':'CouchDBRestStore'}};
  includeRecurse(required);
  })()*/
ludofy.Ludofy = {
    dbUrl:'http://localhost/couchdb',
    getDb:function(table) {
        return new dojox.data.CouchDBRestStore({
            target:this.dbUrl + table
            });
    }
};