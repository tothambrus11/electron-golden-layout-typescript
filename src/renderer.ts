import {layoutConfig} from "./layout.config";
import {GoldenLayout} from "./lib/GoldenLayout";
import {GoldenLayoutObject} from "./lib/GoldenLayoutTypes";

// @ts-ignore
let layout: GoldenLayoutObject = new GoldenLayout(layoutConfig);

layout.registerComponent("videoComponent", (container: any, componentState: any) => {
    let element: HTMLElement = container.getElement().get(0);

    element.innerText = "Video Component"
});

layout.registerComponent("sensorDataComponent", (container: any, componentState: any) => {
    let element: HTMLElement = container.getElement().get(0);

    element.innerText = "Sensor Data Component"
});

layout.registerComponent("eventsComponent", (container: any, componentState: any) => {
    let element: HTMLElement = container.getElement().get(0);

    element.innerText = "Events Component"
});



layout.init();