dojo.provide('strly.layout.tests.ItemEditor');
dojo.require('strly.layout.ItemEditor');
dojo.require('dojo.data.ItemFileWriteStore');
doh.register('strly.layout.tests.ItemEditor', [
    /**
     * test the mechanicals i'm relying on
     */
    function testMechanics() {
        var result = new doh.Deferred();
        var testBind = {object:'editor',property:'value',change:function(){}};
        dojo.connect(testBind,'change',function(){
           result.callback(true);
        });
        testBind.change();
        return result;
    },
    /**
     * test connect mechs
     */
    function testConnectMechs() {
        var editor = {value:'editedVal',change:function(){}};
        var target = {value:'unchaged'};
        var editorWire = {object:editor,property:'value'};
        var targetWire = {object:target,property:'value'};
        var cnx = new dojox.wire.connect({scope:editor,event:'change'},editorWire,targetWire);
        editor.change();
        doh.assertEqual(editor.value,target.value);
    },
    function testEventMech() {
        var res = new dojo.Deferred();
        var editor = dojo.create('input',{value:'unchaged',type:'text'});

        var target = {target:'unchanged'};
        var editorWire = {object:editor,property:'value'};
        var targetWire = {object:target,property:'value'};
        var cnx = new dojox.wire.connect({scope:editor,event:'change'},editorWire,targetWire);
        dojo.attr(editor,'value','changed');
        setTimeout(function(){
            if(dojo.attr(target,'value') == 'changed') {
                console.log('changed!');
                res.callback(true);
            } else {
                res.errback(false);
            }

        },50);
        return res;
    },
    /**
     * test defensive
     */
    function testDefensive(parameters) {
        var gotExpected = false;
        try {
            var x = new strly.layout.ItemEditor({binding:{object:'notpresent',attribute:'moot'}});
        } catch (e) {
            gotExpected = true;
        }
        doh.assertTrue(gotExpected, "require error is thrown when non-present obj is spec for binding");
        var gotExpected = false;
        try {
            var x = new strly.layout.ItemEditor({present:{},binding:{object:'present',attribute:'notpresent'}});
        } catch (e) {
            gotExpected = true;
        }
        doh.assertTrue(gotExpected, "require error is thrown when non-present obj is spec for binding");
    },
    /**
     * Just test it works
     */
    function testSetup(parameters) {
        var x = new strly.layout.ItemEditor();

        var testBind = {
            type:{object:'editor',property:'value'}
        };
        var x = new strly.layout.ItemEditor({
            editor:{value:'init'},
            binding:testBind
        });
        doh.assertEqual(x.attr('binding') , testBind, "binding setup ok");
    },
    function simpleTest() {
        console.log('simpleTest()');
        var result = new doh.Deferred();

        var testStore = new dojo.data.ItemFileWriteStore({
            data:{ 'identifier': 'name',
  'label': 'name',
  'items': [
     { 'name':'Africa', 'type':'continent'},
     { 'name':'Egypt', 'type':'country' },
     { 'name':'Kenya', 'type':'country'},
     { 'name':'Nairobi', 'type':'city' },
     { 'name':'Mombasa', 'type':'city' }]}
        });

        var binding = {
            type:{object:'editor',property:'value'}
        };
        var testItem = false;
        testStore.fetchItemByIdentity({
            identity:'Africa',
            onItem:function(item){
                console.log('got item');
                testItem = item;
                var editor = dojo.create('input',{value:'unchaged',type:'text'});
                //var editor = {type:'twoon',change:function(){}};
                 var x = new strly.layout.ItemEditor({
                    item:testItem,
                    binding:binding,
                    editor:editor,
                    store:testStore
                });
                dojo.attr(editor,'value','changed');
                //console.log(['value is',testStore.getValue(item,'type')]);
                setTimeout(function(){if(testStore.getValue(item,'type') == 'changed') result.callback(true)},50);
            }
        });
        console.log('simpleTest() setup');
        return result;
    }

]);