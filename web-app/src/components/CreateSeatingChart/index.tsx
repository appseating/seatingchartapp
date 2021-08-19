import React, {useEffect, useState} from 'react';
import {k_create_seating_chart_link} from "../CustomNavbar";
import {Container} from "react-bootstrap";
import CustomCanvas from "./CustomCanvas";
import ISeatingChart from "../Interfaces/ISeatingChart";
import ITableGroup from "../Interfaces/ITableGroup";
import IStudent from "../Interfaces/IStudent";

interface CreateSeatingChartProps {
    screen: string;
    setScreen: Function;
    user: any;
}

const CreateSeatingChart: React.FC<CreateSeatingChartProps> = (props: CreateSeatingChartProps) => {
    const [seatingChart, setSeatingChart] = useState<ISeatingChart | undefined>();

    useEffect(() => {
        props.setScreen(k_create_seating_chart_link);

        // hard coded data for testing purposes
        const testSeatingChart: ISeatingChart = {
            id: "someSeatingChartId1",
            name: "someSeatingChartName1",
            numRows: 2,
            numColumns: 2,
            tableGroups: [
                {
                    id: "someTableId1",
                    name: "someTableName1",
                    row: 1,
                    column: 1,
                    students: [
                        {
                            id: "someStudentId1",
                            firstName: "Bob",
                            lastName: "Jones"
                        },
                        {
                            id: "someStudentId2",
                            firstName: "Bobby",
                            lastName: "Jones"
                        }
                    ]
                },
                {
                    id: "someTableId2",
                    name: "someTableName2",
                    row: 1,
                    column: 2,
                    students: [
                        {
                            id: "someStudentId3",
                            firstName: "Jones",
                            lastName: "Bob"
                        }
                    ]
                }
            ]
        };

        setSeatingChart(testSeatingChart);
    }, [props]);

    return (
        <div className={"page-container"}>
            <Container>
                <h1>Create Seating Chart</h1>
                <CustomCanvas seatingChart={seatingChart}/>
            </Container>
        </div>
    );
}

export default CreateSeatingChart;
