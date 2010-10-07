dojo.provide('strly.data.helper');

strly.data.helper.getItemAsObject = function(item,store) {
    var r = {};
    dojo.forEach(store.getAttributes(item),function(attr) {
        r[attr] = store.getValue(item, attr);
    });
    return r;
}
strly.data.helper.getItemsAsArrayOfObjects = function(items,store) {
    return dojo.map(items,function(item){return strly.data.helper.getItemAsObject(item,store)});
}