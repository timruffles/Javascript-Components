dojo.provide('ludofy.pages.game');
dojo.require('ludofy.components.BigOlAddDelete');
dojo.require('ludofy.form.element.Action');
dojo.require('dojo.data.ItemFileWriteStore');
dojo.require('dojox.data.CouchDBRestStore');

var actionStore = new dojox.data.CouchDBRestStore({target:"http://127.0.0.1:5984/ludofy/"});

dojo.addOnLoad(function(){

    
    //var allMyStores = dojox.data.CouchDBRestStore.getStores('http://127.0.0.1:5984');
    
    var actionList = new ludofy.components.BigOlAddDelete({
        store:actionStore,
        itemRenderer:'ludofy.form.element.Action',
        binding:{name:{object:'name',property:'value'}}
    },dojo.byId('actionList'));

    /*
    var rewardList = new ludofy.components.BigOl({
        store:actionStore,
        itemRenderer:'ludofy.form.element.Action'
    },dojo.byId('rewardList'));
    */
    dojo.connect(actionList,'onAddItem',function() {
        actionStore.newItem({name:''});
    });

    // here we need to create a store etc                 

});