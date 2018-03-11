"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var emotion_1 = require("emotion");
var pink = emotion_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  color: hotpink;\n"], ["\n  color: hotpink;\n"])));
var Hello = /** @class */ (function (_super) {
    __extends(Hello, _super);
    function Hello() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hello.prototype.render = function () {
        return (React.createElement("h1", { className: pink },
            "Hello asd from ",
            this.props.compiler,
            " and ",
            this.props.framework,
            "!!!"));
    };
    return Hello;
}(React.Component));
exports.Hello = Hello;
var templateObject_1;
//# sourceMappingURL=Hello.js.map