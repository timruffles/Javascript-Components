dojo.provide("ludofy.components.tests.BigOl");
dojo.require("ludofy.components.BigOl");

doh.register("ludofy.components.tests.BigOl", [
    function testRender() {

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

        var sut = new ludofy.components.BigOl({store:testStore},dojo.create('div'));
        doh.assertEqual(5,dojo.query('li',sut.items).length,"Renderer appropriate number of items");

        var item = sut.attr('store').newItem({ 'name':'London', 'type':'city'});
        doh.assertEqual(6,dojo.query('li',sut.items).length,"Renderer updates with new items");

        sut.attr('store').deleteItem(item);
        doh.assertEqual(5,dojo.query('li',sut.items).length,"Renderer updates with new items");
    },
    function testGetRowByIdentity() {
        var testStore = new dojo.data.ItemFileWriteStore({
            data:{ 'identifier': 'name',
          'label': 'name',
          items:[]}});

         var sut = new ludofy.components.BigOl({store:testStore},dojo.create('div'));
         
        var item = sut.attr('store').newItem({ 'name':'London', 'type':'city'});
        doh.assertEqual(dojo.attr(sut.getRow(item),'identity'),sut.attr('store').getIdentity(item),"fetches li by identity");
    }
]);