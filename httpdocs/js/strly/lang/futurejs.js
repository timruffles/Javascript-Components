dojo.provide('strly.lang.futurejs');

strly.lang.futurejs = {
    destructure:function(dest, source, context) {
        if(dojo.isArray(dest) === false || dojo.isArray(source) === false) {
            throw new TypeError('Destructure requires both source and destination objects to be Arrays');
        }
        if(dest.length != source.length) {
            throw new Error('Destructure requires both source and destionation arrays to be of identical length');
        }
        if(context === undefined) {
            context = window;
        }

        function returnExistingVarOrAssign(theVar) {
            if(dojo.isString(theVar)) {
                if(context[theVar] === undefined) {
                    context[theVar] = null; // assign in caller scope?
                }
                return context[theVar];
            }
            return theVar;
        }

        for(argIndx in arguments[0]) {
            returnExistingVarOrAssign(dest[argIndx]) = returnExistingVarOrAssign(source[argIndx]);
        }
    }

    
}