dojo.provide('strly.layout.tests.ItemList');
dojo.require('strly.layout.ItemList');
dojo.require('dojo.data.ItemFileWriteStore');

doh.register('strly.layout.ItemList', [
    /**
     *
     */
    function firstTest() {

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


        var list = new strly.layout.ItemList({store:testStore},dojo.create('div'));
        console.log(list);
        doh.assertEqual(dojo.query('div',list.items).length,5);
    },
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

        var sut = new strly.layout.ItemList({store:testStore},dojo.create('div'));
        doh.assertEqual(5,dojo.query('div',sut.items).length,"Renderer appropriate number of items");

        var item = sut.attr('store').newItem({ 'name':'London', 'type':'city'});
        doh.assertEqual(6,dojo.query('div',sut.items).length,"Renderer updates with new items");

        sut.attr('store').deleteItem(item);
        doh.assertEqual(5,dojo.query('div',sut.items).length,"Renderer updates post delete");

    },
    function testGetRowByIdentity() {
        var testStore = new dojo.data.ItemFileWriteStore({
            data:{ 'identifier': 'name',
          'label': 'name',
          items:[]}});

         var sut = new strly.layout.ItemList({store:testStore},dojo.create('div'));

        var item = sut.attr('store').newItem({ 'name':'London', 'type':'city'});
        doh.assertEqual(dojo.attr(sut.getRow(item),'identity'),sut.attr('store').getIdentity(item),"fetches li by identity");
    }
]);