dojo.provide('strly.lang.FluentObj');
dojo.declare('strly.lang.FluentObj',[],{
    // summary:
    //          Sets either one key-val, or an object hash of them, and returns this to allow chaining
    // key: string || object
    //          String or obj
    // value: mixed
    //          Value for key
    set: function(key,value) {
        if(arguments.length == 2) {
            this[key] = value;
        } else {
            for(var prop in key) {
                this[prop] = key[prop];
            }
        }
        return this;
    }
});