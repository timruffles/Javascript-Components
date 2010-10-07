dojo.provide('strly.lang.tests.futurejs');
dojo.require('strly.lang.futurejs');
doh.register('strly.lang.tests.futurejs', [
    function simpleDestructure() {

        l = strly.lang.futurejs;
        
        var a = 'A';
        var b = 'B';
        var aF = a.toString();
        var bF = b.toString();

        l.destructure([a,b],[b,a],arguments.callee);
        doh.assertEqual([a,b], [bF,aF], "Should be equal after cross assign");

        var returnsPair = function(){ this.pair = ['fooVal','barVal'];return pair; };
        var tInstance = new returnsPair();
        l.multireturn(['foo','bar'],tInstance);

        doh.assertEqual(foo,tInstance.pair[0],'Multi return function assigns when passed non existant parmams');
        doh.assertEqual(bar,tInstance.pair[1],'Multi return function assigns when passed non existant parmams');

        var ting = null;
        l.multireturn(['fing',ting],tInstance);
        doh.assertEqual(fing,tInstance.pair[0],'Multi return function assigns when passed a mix of existant and non existant parmams');
        doh.assertEqual(ting,tInstance.pair[1],'Multi return function assigns when passed a mix of existant and non existant parmams');
        
    }
]);