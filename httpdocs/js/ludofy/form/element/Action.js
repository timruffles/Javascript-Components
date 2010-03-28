dojo.provide('ludofy.form.element.Action');
dojo.require('ludofy.components.ItemEditor');

dojo.declare('ludofy.form.element.Action',[ludofy.components.ItemEditor],{
    templateString:'<div dojoAttachPoint="containerNode" class="ludofyFormElementAction">\
                        <input type="text" class="actionNameInput" dojoAttachPoint="name" />\
                        <input type="button" class="actionNameType" dojoAttachPoint="type" value="Type" />\
                    </div>'
});