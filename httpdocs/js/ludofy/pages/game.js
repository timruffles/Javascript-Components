dojo.provide('ludofy.pages.game');
dojo.require('ludofy.components.BigOlAddDelete');
dojo.require('ludofy.form.element.Action');

dojo.addOnLoad(function(){

    var actionList = new ludofy.components.BigOlAddDelete({},dojo.byId('actionList'));
    var firstAction = new ludofy.form.element.Action({},dojo.create('div'));
    actionList.push(firstAction.containerNode);

    dojo.connect(actionList,'onAddItem',function() {
        var firstAction = new ludofy.form.element.Action({},dojo.create('div'));
        actionList.push(firstAction.containerNode);
    });

    // here we need to create a store etc

});