dojo.provide('strly.form.element.Action');
dojo.require('strly.layout.ItemEditor');

dojo.declare('strly.form.element.Action',strly.layout.ItemEditor,{
    templateString:'<div dojoAttachPoint="containerNode" class="strlyFormElementAction">\
                        <input type="text" class="actionNameInput" dojoAttachPoint="name" />\
                        <input type="button" class="actionNameType" dojoAttachPoint="type" value="Type" />\
                    </div>'
});