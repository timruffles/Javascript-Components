dojo.provide("strly.layout.tests.BigOl");
dojo.require("strly.layout.BigOl");

doh.register("strly.layout.tests.BigOl", [
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

        var sut = new strly.layout.BigOl({store:testStore},dojo.create('li'));
        doh.assertEqual(5,dojo.query('li',sut.items).length,"Renderer appropriate number of items");

        var item = sut.attr('store').newItem({ 'name':'London', 'type':'city'});
        doh.assertEqual(6,dojo.query('li',sut.items).length,"Renderer updates with new items");

        sut.attr('store').deleteItem(item);
        doh.assertEqual(5,dojo.query('li',sut.items).length,"Renderer updates with new items");
    }
]);