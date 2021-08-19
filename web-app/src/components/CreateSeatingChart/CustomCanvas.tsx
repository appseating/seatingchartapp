import React from "react";
import p5Types from "p5";
import Sketch from "react-p5";
import ISeatingChart from "../Interfaces/ISeatingChart";

interface CustomCanvasProps {
    seatingChart?: ISeatingChart;
}

const CustomCanvas: React.FC<CustomCanvasProps> = (props: CustomCanvasProps) => {
    const { seatingChart } = props;

    let x = 50;
    const y = 50;

    const setup: any = (p5: p5Types, canvasParentRef: Element): void => {
        p5.createCanvas(500, 500).parent(canvasParentRef);
    }

    const draw: any = (p5: p5Types): void => {
        // clear canvas
        p5.background(0);

        // draw seating chart if it was passed into props
        if(seatingChart) {
            p5.ellipse(x, y, 70, 70);
            x++;
        }
    }

    return <Sketch setup={setup} draw={draw}/>;
}

export default CustomCanvas;