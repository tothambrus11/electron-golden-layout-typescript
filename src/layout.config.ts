import {ItemConfig, LayoutConfig} from "./lib/GoldenLayoutTypes";

export let layoutConfig: LayoutConfig = {
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
                            width: 33,
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