import React, {useEffect, useState} from 'react';
import {k_create_layout_link} from "../CustomNavbar";
import {Container} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import {Student, Group, Layout, Seating, Roster} from "../Interfaces/DataModel";
import GridCanvas from "./GridCanvas";

interface PassedState {
    fromHub: boolean;
    layout: Layout;
}

interface CreateLayoutProps {
    screen: string;
    setScreen: Function;
    user: any;
    layouts: Layout[];
}

const CreateLayout = (props: CreateLayoutProps) => {
    // Layout prop passed by Hub page.
    const location = useLocation();
    const { fromHub, layout } = location.state as PassedState || {fromHub: false, layout: null};
    console.log(fromHub);
    console.log(layout);

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
                <GridCanvas layout={layout}/>
            </Container>
        </div>
    );
}

export default CreateLayout;