import React from "react";
import p5Types from "p5";
import Sketch from "react-p5";
import {Layout} from "../Interfaces/DataModel";
import {k_hub_link} from "../CustomNavbar";
import { useHistory } from "react-router";
import {k_layouts, saveToStorage} from "../../utils/Storage";

interface GridCanvasProps {
    layout: Layout;
    layouts: Layout[];
    setLayouts: Function;
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

export class Table {
    constructor(
        // public p5: p5Types,
        public x: number,
        public y: number,
        public w: number = 30,
        public h: number = 20,
        public theta: number = 0,
        public group: number,
        public i: number,           // TODO: remove after changing grid of Tables to more robust UI
        public j: number            // TODO: see above ^^
    ) {}

    // toString() {
    //     const map: any = {
    //         x: this.x,
    //         y: this.y,
    //         w: this.w,
    //         h: this.h,
    //         theta: this.theta,
    //         group: this.group,
    //         i: this.i,
    //         j: this.j
    //     };
    //
    //     return JSON.stringify(map);
    // }
}

let grid: Table[][];

const GridCanvas: React.FC<GridCanvasProps> = (props: GridCanvasProps) => {
    let { layout, layouts } = props;

    const width: number = 500;
    const height: number = 500;
    const numCol: number = 10;
    const numRow: number = 10;
    const gridWidth: number = 500;
    const gridHeight: number = 500;

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

    const history = useHistory();
    let canvas: p5Types.Element;
    let input: p5Types.Element, saveButton: p5Types.Element, saveExitButton: p5Types.Element;

    // returns true if (x,y) is inside the rectangle
    const within = (x: number, y: number, table: Table) => {
        // TODO: make for theta != 0
        return (x >= table.x && x < table.x + table.w &&
            y >= table.y && y < table.y + table.h);
    }

    const getStyles = (p5: p5Types): any => {
        const map = {
            TABLE_COLOR : p5.color(244, 164, 96),
            EMPTY_COLOR : p5.color(255,255,255),
            TEXT_COLOR : p5.color(0,0,0),
            TEXT_SIZE : 20
        }

        return map;
    }

    // render the rectangle
    const display = (p5: p5Types, table: Table) => {
        const styles: any = getStyles(p5);

        if(table.group > 0) {
            p5.fill(styles.TABLE_COLOR);
            p5.rect(table.x, table.y, table.w, table.h);

            p5.fill(styles.TEXT_COLOR);
            p5.textSize(styles.TEXT_SIZE);
            p5.textAlign(p5.CENTER, p5.CENTER);
            p5.text(table.group, table.x + table.w/2, table.y + table.h/2);
        } else {
            p5.fill(styles.EMPTY_COLOR);
            p5.rect(table.x, table.y, table.w, table.h);
        }
    }

    const save = (p5: p5Types) => {
        // first, check that we have initialized the grid
        if(!grid)
            return;

        // store name
        layout.name = input.value().toString() === "" ? "New Layout "+layouts.length : input.value().toString();

        // store current canvas in layout.image
        layout.image = canvas.elt.toDataURL();

        // store current canvas in layout.tables
        for(let i = 0; i < 10; i++)
            layout.tables[i] = [];
        for(let i = 0; i < numCol; i++)
            for(let j = 0; j < numRow; j++)
                layout.tables[grid[i][j].group]?.push(grid[i][j]);

        // save layout
        let i: number = layouts.indexOf(layout);        // this checks by UUID of layout
        if(i === -1) {
            layouts.push(layout);
            console.log("Saved new layout");
        } else {
            layouts[i] = layout;
            console.log(layout);
            console.log("Updated layout " + i);
        }
        console.log('layouts: ', layouts);
        props.setLayouts(layouts);
        saveToStorage(k_layouts, layouts);
    }

    const saveExit = (p5: p5Types) => {
        save(p5);
        history.push(k_hub_link);
    }

    const setup: any = (p5: p5Types, canvasParentRef: Element): void => {
        console.log("Render GridCanvas");
        canvas = p5.createCanvas(width, height).parent(canvasParentRef);

        // default Table grid
        let tableWidth = gridWidth / numCol;
        let tableHeight = gridHeight / numRow;

        grid = [];
        for (let i = 0; i < numCol; i++) {
            grid[i] = [];
            for (let j = 0; j < numRow; j++) {
                grid[i][j] = new Table(i * tableWidth, j * tableHeight, tableWidth, tableHeight,
                    0, 0, i, j);
            }
        }

        // if given valid layout, initialize groups
        if(layout) {
            // layout.tables.forEach(function(arr: any, groupNum: any) {
            for(const [tableNumber, tablesArr] of Object.entries(layout.tables)) {
                const arr: any = tablesArr;
                for(let k = 0; k < arr.length; k++) {
                    let table = arr[k];
                    grid[table.i][table.j] = table;
                    console.log("Load table "+table.i+" "+table.j);
                }
            }
        }

        // input, buttons
        input = p5.createInput(layout.name).parent(canvasParentRef);
        saveButton = p5.createButton("Save").parent(canvasParentRef);
        saveButton.mouseClicked(() => { save(p5) } );
        saveExitButton = p5.createButton("Save and Exit").parent(canvasParentRef);
        saveExitButton.mouseClicked( () => { saveExit(p5) } );

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
                display(p5, grid[i][j]);
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
                    if (grid && within(mouse.x, mouse.y, grid[i][j])) {
                        grid[i][j].group = selectedGroup;
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