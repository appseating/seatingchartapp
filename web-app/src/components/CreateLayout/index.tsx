import React, {useEffect, useState} from 'react';
import {k_create_layout_link} from "../CustomNavbar";
import {Container} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import {Student, Group, Layout, Seating, Roster} from "../Interfaces/DataModel";
import GridCanvas from "./GridCanvas";

interface PassedState {
    fromHub: boolean;
    layoutID: string;
}

interface CreateLayoutProps {
    screen: string;
    setScreen: Function;
    user: any;
    layouts: Layout[];
    setLayouts: Function;
}

const CreateLayout = (props: CreateLayoutProps) => {
    // Layout prop passed by Hub page.
    const location = useLocation();
    const { fromHub, layoutID } = location.state as PassedState || {fromHub: false, layoutID: ""};
    console.log(fromHub);
    console.log(layoutID);
    let layout = new Layout();
    for(let i = 0; i < props.layouts.length; i++)
        if(props.layouts[i].id === layoutID) {
            layout = props.layouts[i];
            break;
        }
    console.log(layout);
    console.log(props.layouts);

    useEffect(() => {
        props.setScreen(k_create_layout_link);
    }, [props]);

    return (
        <div className={"page-container"}>
            <Container>
                <h1>Create Layout</h1>
                <div>
                    To select tables, hold a digit (1-9) and click on the squares. To unselect, click the squares
                    without pressing any keys.
                </div>
                <br/>
                <GridCanvas layout={layout} layouts={props.layouts} setLayouts={props.setLayouts}/>
            </Container>
        </div>
    );
}

export default CreateLayout;