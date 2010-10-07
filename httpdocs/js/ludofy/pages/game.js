dojo.provide('ludofy.pages.game');
dojo.require('ludofy.Ludofy');

dojo.require('strly.layout.BigOlAddDelete');
dojo.require('strly.form.element.Action');
dojo.require('strly.form.element.ResultEditor');
dojo.require('strly.data.StoreLinker');
dojo.require('strly.lang.helper');
dojo.require('strly.data.helper');


// temporary
dojo.require('dojo.data.ItemFileWriteStore');

dojo.addOnLoad(function(){

    // data setup
    var actionStore = new dojo.data.ItemFileWriteStore({
        data:{identifier:'id',items:[{id:1,name:'Action one'}]}
    });

    var resultStore = new dojo.data.ItemFileWriteStore({
        data:{identifier:'id',items:[{id:1,name:'Result one',points:0}]}
    });

    strly.data.StoreLinker.link(actionStore,resultStore,{bidirectional:false});

    // UI setup
    // actions
    var actionList = new strly.layout.BigOlAddDelete({
        store:actionStore,
        itemRenderer:'strly.form.element.Action',
        itemRendererParams:{binding:{name:{object:'name',property:'value'}}}
    },dojo.byId('actionList'));

    dojo.connect('click', dijit.byId('gameSaveBtn'), actionStore.save);

    dojo.connect(actionList,'onAddItem',function() {
        actionStore.newItem({id:Math.random(2000),name:''});
    });

    // rewards
    var rewardList = new strly.layout.BigOl({
        store:resultStore,
        itemRenderer:'strly.form.element.ResultEditor'
    },dojo.byId('rewardList'));

    // saving
    dojo.connect(dojo.byId('gameSaveBtn'),'click',function(){
        var gameStore = ludofy.Ludofy.getDb('/ludofy');
        var fetchSync = strly.lang.helper.synchronise(2,function(actionList,resultList){
            console.log('saving!');
            gameStore.newItem({
               name:dojo.attr(dojo.byId('gameName'),'value'),
               actions:actionList,
               results:resultList
            });
            gameStore.save();
            console.log('saved');
        });
        actionStore.fetch({
            onComplete:function(items) {
                fetchSync[0].callback(strly.data.helper.getItemsAsArrayOfObjects(items,actionStore));
            }
        });
        resultStore.fetch({
            onComplete:function(items) {
                fetchSync[1].callback(strly.data.helper.getItemsAsArrayOfObjects(items,resultStore));
            }
        })
    });
});