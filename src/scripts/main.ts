/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="_reference.ts" />

$(() => {
    var el = $('#content');
    var btn = $('#btn');
    var helloworld = new Main.HelloWorld(el, btn);
});