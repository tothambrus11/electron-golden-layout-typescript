"use strict";
exports.__esModule = true;
exports.layoutConfig = {
    content: [
        {
            type: "column",
            content: [
                {
                    type: "row",
                    content: [
                        {
                            type: "stack",
                            content: [
                                {
                                    type: "component",
                                    componentName: "videoComponent"
                                },
                                {
                                    type: "component",
                                    componentName: "videoComponent"
                                }
                            ]
                        },
                        {
                            type: "component",
                            componentName: "eventsComponent",
                            width: 33
                        }
                    ]
                },
                {
                    type: "component",
                    componentName: "sensorDataComponent",
                    height: 33
                }
            ]
        }
    ]
};
//# sourceMappingURL=layout.config.js.map