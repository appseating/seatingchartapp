import React from "react";
import p5Types from "p5";
import Sketch from "react-p5";
import {Layout} from "../Interfaces/DataModel";

interface GridCanvasProps {
    layout?: Layout;
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

class Table {
    private TABLE_COLOR = this.p5.color(244, 164, 96);
    private EMPTY_COLOR = this.p5.color(255,255,255);
    private TEXT_COLOR = this.p5.color(0,0,0);
    private TEXT_SIZE = 20;

    constructor(
        private p5: p5Types,
        public x: number,
        public y: number,
        public w: number = 30,
        public h: number = 20,
        public theta: number = 0,
        public group: number
    ) {}

    setGroup(group: number) {
        this.group = group;
    }

    // returns true if (x,y) is inside the rectangle
    within(x: number, y: number) {
        // TODO: make for theta != 0
        return (x >= this.x && x < this.x + this.w &&
            y >= this.y && y < this.y + this.h);
    }

    // render the rectangle
    display() {
        if(this.group > 0) {
            this.p5.fill(this.TABLE_COLOR);
            this.p5.rect(this.x, this.y, this.w, this.h);

            this.p5.fill(this.TEXT_COLOR);
            this.p5.textSize(this.TEXT_SIZE);
            this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
            this.p5.text(this.group, this.x + this.w/2, this.y + this.h/2);
        } else {
            this.p5.fill(this.EMPTY_COLOR);
            this.p5.rect(this.x, this.y, this.w, this.h);
        }
    }
}

let grid: Table[][];

const GridCanvas: React.FC<GridCanvasProps> = (props: GridCanvasProps) => {
    const { layout } = props;

    const width: number = 500;
    const height: number = 500;
    const numCol: number = 10;
    const numRow: number = 10;
    let gridWidth: number;
    let gridHeight: number;

    let selectedGroup: number = 0;

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
        console.log("Render GridCanvas");
        p5.createCanvas(width, height).parent(canvasParentRef);

        // create grid of Rectangles TODO: initialize if given layout input
        gridWidth = width / numCol;
        gridHeight = height / numRow;

        grid = [];
        for(let i = 0; i < numCol; i++) {
            grid[i] = [];
            for(let j = 0; j < numRow; j++) {
                grid[i][j] = new Table(p5, i*gridWidth, j*gridHeight, gridWidth, gridHeight, 0, 0);
            }
        }
        p5.noLoop();
    }

    const draw: any = (p5: p5Types): void => {
        // clear canvas
        p5.background(200);

        // move the camera
        p5.scale(camera.zoom);
        p5.translate(0, 0);
        //p5.translate(width / 2 + camera.x, height / 2 + camera.y);    // centers the camera

        for(let i = 0; i < numCol; i++) {
            for(let j = 0; j < numRow; j++) {
                grid[i][j].display();
            }
        }
    }

    const updateMouse: any = (p5: p5Types) => {
        // update mouse position
        mouse.x = p5.mouseX;
        mouse.y = p5.mouseY;

        // check whether mouse is within the screen
        mouse.withinScreen = mouse.x >= 0 && mouse.x <= width && mouse.y >= 0 && mouse.y <= height;
    }

    const mousePressed: any = (p5: p5Types): void => {
        updateMouse(p5);

        if(mouse.withinScreen) {
            // check if user clicked a rectangle
            for (let i = 0; i < numCol; i++) {
                for (let j = 0; j < numRow; j++) {
                    if (grid && grid[i][j].within(mouse.x, mouse.y)) {
                        grid[i][j].setGroup(selectedGroup);
                        console.log("Set grid (" + i + ", " + j + ") to group " + selectedGroup);
                    }
                }
            }

            p5.redraw();
        }
    }

    const keyTyped: any = (p5: p5Types): void => {
        const key : number = parseInt(p5.key.charAt(0));
        if(key <= 9 && key >= 1) {
            selectedGroup = key;
            console.log(selectedGroup);
        }
    }

    const keyReleased: any = (p5: p5Types): void => {
        selectedGroup = 0;
    }

    return <Sketch setup={setup} draw={draw} mousePressed={mousePressed} keyTyped={keyTyped} keyReleased={keyReleased}/>;
}

export default GridCanvas;