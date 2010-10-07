dojo.provide('strly.form.element.ResultEditor');
dojo.require('strly.layout.ItemEditor');

dojo.declare('strly.form.element.ResultEditor',strly.layout.ItemEditor,{
    templateString:'<div dojoAttachPoint="containerNode"><label for="points">Points<input dojoAttachPoint="points" name="points" /></label></div>'
});