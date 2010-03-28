dojo.provide("ludofy.components.tests.BigOl");
dojo.require("ludofy.components.BigOl");
doh.register("ludofy.components.tests.BigOl", [
    function testArrayFunctions() {
        var sut = new ludofy.components.BigOl({},dojo.create('div'));

        var t1 = 'xxx';
        sut.push(t1);

        doh.assertEqual(t1, sut.get(0), "Retrival worked");
        // two in, two out, original
        sut.push(t1);
        sut.push(t1);
        doh.assertEqual(t1, sut.pop(), "Retrival worked");
        doh.assertEqual(t1, sut.shift(), "Retrival worked");
        doh.assertTrue(sut.indexOf(t1) != -1, "obj stored");
    }
]);