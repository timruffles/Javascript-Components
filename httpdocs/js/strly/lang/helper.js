dojo.provide('strly.lang.helper');
dojo.require('strly.lang.FluentObj');
strly.lang.helper = {
    /**
     * Creates a new strly.lang.FluentObj from a baseObj
     */
    createFluent: function(baseObj) {
        var fluent = new strly.lang.FluentObj();
        return dojo.mixin(fluent,baseObj);
    },
    /**
     * Returns an array holding each of the object's keys' values
     */
    toArray:function(obj) {
        var asArray = [];
        for(var id in obj) {
            asArray.push(obj[id]);
        }
        return asArray;
    },
    /**
     * Returns an array of object properties
     */
    getObjectProperties:function(obj) {
        var props = [];
        for(p in obj) {
            props.push(p);
        }
        return props;
    },
    synchronise: function(tasks,targetFn) {

        this.results = [];

        self = this;

        this.registerResult = function(result,resultId) {
            self.results[resultId] = result;
            if(dojo.filter(self.results,'return item != undefined').length === tasks) {
                targetFn.apply(this,self.results);
            }
        }

        var defs = [];
        for (i = 0; i < tasks; i++) {
            (function(){
                var taskId = i;
                var def = new dojo.Deferred().addCallback(function(result){
                    console.log('Synchron callback received');
                    self.registerResult(result,taskId);
                });
                defs.push(def);
            })();
        }
        return defs;
    }
};