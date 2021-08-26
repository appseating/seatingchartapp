import React, {useEffect, useState} from 'react';
import {k_create_layout_link} from "../CustomNavbar";
import {Container} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import {Student, Group, Layout, Seating, Roster} from "../Interfaces/DataModel";

interface PassedState {
    fromHub: boolean;
    layout: Layout;
}

interface CreateLayoutProps {
    screen: string;
    setScreen: Function;
    user: any;
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
            </Container>
        </div>
    );
}

export default CreateLayout;