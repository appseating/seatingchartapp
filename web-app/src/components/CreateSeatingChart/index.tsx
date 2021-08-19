import React, {useEffect} from 'react';
import {k_create_seating_chart_link} from "../CustomNavbar";
import {Container} from "react-bootstrap";

interface CreateSeatingChartProps {
    screen: string;
    setScreen: Function;
    user: any;
}

const CreateSeatingChart = (props: CreateSeatingChartProps) => {
    useEffect(() => {
        props.setScreen(k_create_seating_chart_link);
    }, [props]);

    return (
        <div className={"page-container"}>
            <Container>
                <h1>Create Seating Chart</h1>
            </Container>
        </div>
    );
}

export default CreateSeatingChart;
