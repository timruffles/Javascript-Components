dojo.provide('ludofy.pages.game');
dojo.require('ludofy.components.BigOlAddDelete');
dojo.require('ludofy.form.element.Action');
dojo.require('dojo.data.ItemFileWriteStore');

dojo.addOnLoad(function(){

    var actionStore = new dojo.data.ItemFileWriteStore({
        data:{
            identifier:'id',
            items:[]
        }
    })
    var actionList = new ludofy.components.BigOlAddDelete({
        store:actionStore,
        itemRenderer:'ludofy.form.element.Action'
    },dojo.byId('actionList'));


    var rewardList = new ludofy.components.BigOl({
        store:actionStore,
        itemRenderer:'ludofy.form.element.Action'
    },dojo.byId('rewardList'));

    dojo.connect(actionList,'onAddItem',function() {
        actionStore.newItem({'id':Math.random(1000)});
    });

    // here we need to create a store etc                 

});