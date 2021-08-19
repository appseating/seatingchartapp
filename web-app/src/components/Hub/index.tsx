import React, {useEffect} from 'react';
import {k_hub_link} from "../Home";
import {Container} from "react-bootstrap";
import ISeatingChart from "../Interfaces/ISeatingChart";
import CustomListTable from "./CustomListTable";

interface HomeProps {
    screen: string;
    setScreen: Function;
    user: any;
}

const Hub = (props: HomeProps) => {
    useEffect(() => {
        props.setScreen(k_hub_link);
    }, [props]);

    // hard coded data for testing purposes
    const testSeatingChart1: ISeatingChart = {
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
    const testSeatingChart2: ISeatingChart = {
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
    const seatingCharts1 = [testSeatingChart1, testSeatingChart2];
    const seatingCharts2 = [testSeatingChart1, testSeatingChart2];


    return (
        <div className={"page-container"}>
            <Container>
                <h1>Builder Hub</h1>
				<div>
				We will fill this page with lists of in-progress and completed class layouts and rosters. It will also link to other "Create" pages.
				</div>
                <br/>
                <CustomListTable
                    title="Seating Layouts"
                    seatingCharts={seatingCharts1}
                />
                <br/>
                <CustomListTable
                    title="Class Rosters"
                    seatingCharts={seatingCharts2}
                />
            </Container>
        </div>
    );
}

export default Hub;

