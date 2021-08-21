import React, {useEffect} from 'react';
import {Container} from "react-bootstrap";
import {k_hub_link} from "../CustomNavbar";
import { Student, Group, Layout, Seating, Roster } from "../Interfaces/DataModel";
import Table from "./Table";

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
    const Student1 = new Student(1, "Alice", 11, 1);
    const Student2 = new Student(2, "Bob", 11, -1);

    const Group1 = new Group("Alice's Group", [1]);
    const Group2 = new Group("Bob's Group", [2]);
    const Groups : Group[] = [Group1, Group2];

    const Layout1 = new Layout(3, "Layout1");
    const Layout2 = new Layout(4, "Layout2");
    const Layout3 = new Layout(5, "Layout3");
    const Layouts : Layout[] = [Layout1, Layout2, Layout3];

    const Seating1 = new Seating(6, "Seating1", Groups, 1);
    const Seating2 = new Seating(7, "Seating2", Groups, 2);
    const Seating3 = new Seating(8, "Seating3", Groups, 2);
    const Seating4 = new Seating(9, "Seating4", Groups, 3);
    const Seatings1 : Seating[] = [Seating1];
    const Seatings2 : Seating[] = [Seating2, Seating3];
    const Seatings3 : Seating[] = [Seating4];

    const Roster1 = new Roster(10, "Roster1", undefined, undefined, Seatings1);
    const Roster2 = new Roster(11, "Roster2", undefined, undefined, Seatings2);
    const Roster3 = new Roster(12, "Roster3", undefined, undefined, Seatings3);
    const Rosters : Roster[] = [Roster1, Roster2, Roster3];


    return (
        <div className={"page-container"}>
            <Container>
                <h1>Builder Hub</h1>
				<div>
				We will fill this page with lists of in-progress and completed class layouts and rosters. It will also link to other "Create" pages.
				</div>
                <br/>
                <Table
                    title="Seating Layouts"
                    data={Layouts}
                />
                <br/>
                <Table
                    title="Class Rosters"
                    data={Rosters}
                />
            </Container>
        </div>
    );
}

export default Hub;

