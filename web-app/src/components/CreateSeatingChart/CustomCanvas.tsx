import React from "react";
import p5Types from "p5";
import Sketch from "react-p5";
import {Layout, Seating} from "../Interfaces/DataModel";

interface CustomCanvasProps {
    seatingChart?: Layout | Seating;
}

interface Vector2f {
    x: number;
    y: number;
}

interface IMouse {
    withinScreen: boolean,
    x: number;
    y: number;
    dragStart?: {x: number, y: number};
    dragEnd?: {x: number, y: number};
    dragOffset: Vector2f
}

interface IP5Camera {
    x: number;
    y: number;
    zoom: number;
}

const CustomCanvas: React.FC<CustomCanvasProps> = (props: CustomCanvasProps) => {
    const { seatingChart } = props;

    const width: number = 500;
    const height: number = 500;

    const selectedObj: any = undefined;

    let mouse: IMouse = {
        withinScreen: false,
        x: 0,
        y: 0,
        dragOffset: {x: 0, y: 0}
    };

    let camera: IP5Camera = {
        x: 0,
        y: 0,
        zoom: 1.0
    };

    const setup: any = (p5: p5Types, canvasParentRef: Element): void => {
        p5.createCanvas(width, height).parent(canvasParentRef);
    }

    const draw: any = (p5: p5Types): void => {
        // clear canvas
        p5.background(0);

        // // move the camera
        p5.scale(camera.zoom);
        p5.translate(width / 2 + camera.x, height / 2 + camera.y);

        // draw seating chart if it was passed into props
        if(seatingChart) {
            p5.fill(255);
            p5.ellipse(0, 0, 70, 70);
        }

        updateMouse(p5);
    }

    const updateMouse: any = (p5: p5Types) => {
        // update mouse position
        mouse.x = p5.mouseX;
        mouse.y = p5.mouseY;

        // check whether mouse is within the screen
        mouse.withinScreen = mouse.x >= 0 && mouse.x <= width && mouse.y >= 0 && mouse.y <= height;
    }

    const mouseMoved: any = (p5: p5Types): void => {
        updateMouse(p5);
    }

    const mousePressed: any = (p5: p5Types): void => {
        updateMouse(p5);

        if(mouse.withinScreen) {
            mouse.dragStart = {
                x: p5.mouseX,
                y: p5.mouseY
            };

            console.log(mouse);
        }
    }

    const mouseReleased: any = (p5: p5Types): void => {
        updateMouse(p5);

        mouse.dragStart = undefined;
        mouse.dragEnd = undefined;
        mouse.dragOffset = {x: camera.x, y: camera.y};
    }

    const mouseDragging: any = (p5: p5Types) => {
        if(mouse.dragStart !== undefined && mouse.withinScreen) {
            mouse.dragEnd = {
                x: p5.mouseX,
                y: p5.mouseY
            };

            const deltaDrag: Vector2f = {
                x: mouse.dragEnd.x - mouse.dragStart.x,
                y: mouse.dragEnd.y - mouse.dragStart.y
            };

            camera.x = mouse.dragOffset.x + deltaDrag.x;
            camera.y = mouse.dragOffset.y + deltaDrag.y;
        }
    }

    const mouseWheel: any = (p5: p5Types): void => {
        console.log(p5);

        updateMouse(p5);
    }

    return <Sketch setup={setup} draw={draw} mouseDragged={mouseDragging} mouseMoved={mouseMoved} mouseWheel={mouseWheel} mousePressed={mousePressed} mouseReleased={mouseReleased}/>;
}

export default CustomCanvas;