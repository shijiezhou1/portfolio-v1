"use strict";
exports.__esModule = true;
var abc = 1;
var example = /** @class */ (function () {
    function example(id, name) {
        this.id = id;
        this.name = name;
    }
    example.prototype.getName = function () {
        return this.name;
    };
    return example;
}());
exports["default"] = example;
var test = new example("123", "jay");
var a = test.getName();
var ooo = a.charAt(0);
var i = 0;
var gg;
for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
    var iterator = a_1[_i];
    gg = iterator.charAt(i);
    i++;
    gg;
}
//# sourceMappingURL=example.js.map