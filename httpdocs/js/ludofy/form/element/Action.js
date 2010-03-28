dojo.provide('ludofy.form.element.Action');
dojo.require('dijit._Widget');
dojo.require('dijit._Templated');

dojo.declare('ludofy.form.element.Action',[dijit._Widget,dijit._Templated],{
    templateString:'<div dojoAttachPoint="containerNode" class="ludofyFormElementAction">\
                        <input type="text" class="actionNameInput" dojoAttachPoint="name" />\
                        <input type="button" class="actionNameType" dojoAttachPoint="type" value="Type" />\
                    </div>'
});