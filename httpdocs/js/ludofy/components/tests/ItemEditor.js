dojo.provide('ludofy.components.tests.ItemEditor');
dojo.require('ludofy.components.ItemEditor');
dojo.require('dojo.data.ItemFileWriteStore');
doh.register('ludofy.components.tests.ItemEditor', [
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
    /**
     * Just test it works
     */
    function testSetup(parameters) {
        var x = new ludofy.components.ItemEditor();

        var testBind = {
            type:{object:'editor',property:'value'}
        };
        var x = new ludofy.components.ItemEditor({
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
                var editor = {value:'unchanged',change:function(){}};
                 var x = new ludofy.components.ItemEditor({
                    item:testItem,
                    binding:binding,
                    editor:editor,
                    store:testStore
                });
                editor.value = 'changed';
                editor.change();
                //console.log(['value is',testStore.getValue(item,'type')]);
                result.callback(testStore.getValue(item,'type') == 'changed');
            }
        });
        console.log('simpleTest() setup');
        return result;
    }

]);