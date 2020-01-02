"use strict";
exports.__esModule = true;
var layout_config_1 = require("./layout.config");
var GoldenLayout_1 = require("./lib/GoldenLayout");
// @ts-ignore
var layout = new GoldenLayout_1.GoldenLayout(layout_config_1.layoutConfig);
layout.registerComponent("videoComponent", function (container, componentState) {
    var element = container.getElement().get(0);
    element.innerText = "Video Component";
});
layout.registerComponent("sensorDataComponent", function (container, componentState) {
    var element = container.getElement().get(0);
    element.innerText = "Sensor Data Component";
});
layout.registerComponent("eventsComponent", function (container, componentState) {
    var element = container.getElement().get(0);
    element.innerText = "Events Component";
});
layout.init();
//# sourceMappingURL=renderer.js.map