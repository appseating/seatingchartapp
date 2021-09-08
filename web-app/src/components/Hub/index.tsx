import React, {useEffect} from 'react';
import {Container} from "react-bootstrap";
import {k_hub_link} from "../CustomNavbar";
import { Layout, Roster } from "../Interfaces/DataModel";
import ExpandableTable from "./ExpandableTable";

interface HomeProps {
    screen: string;
    setScreen: Function;
    user: any;
    layouts: Layout[];
    rosters: Roster[];
    setLayouts: Function;
    setRosters: Function;
}

const Hub = (props: HomeProps) => {
    useEffect(() => {
        props.setScreen(k_hub_link);
    }, [props]);

    /*
    // hard coded data for testing purposes
    const Student1 = new Student("Alice", 11, 1);
    const Student2 = new Student("Bob", 11, -1);

    const Group1 = new Group("Alice's Group", [1]);
    const Group2 = new Group("Bob's Group", [2]);
    const Groups : Group[] = [Group1, Group2];

    const Layout1 = new Layout("Layout1");
    const Layout2 = new Layout("Layout2");
    const Layout3 = new Layout("Layout3");
    const Layouts : Layout[] = [Layout1, Layout2, Layout3];

    const Seating1 = new Seating("Seating1", Groups, 1);
    const Seating2 = new Seating("Seating2", Groups, 2);
    const Seating3 = new Seating("Seating3", Groups, 2);
    const Seating4 = new Seating("Seating4", Groups, 3);
    const Seatings1 : Seating[] = [Seating1];
    const Seatings2 : Seating[] = [Seating2, Seating3];
    const Seatings3 : Seating[] = [Seating4];

    const Roster1 = new Roster("Roster1", undefined, Seatings1);
    const Roster2 = new Roster("Roster2", undefined, Seatings2);
    const Roster3 = new Roster("Roster3", undefined, Seatings3);
    const Rosters : Roster[] = [Roster1, Roster2, Roster3]; */

    return (
        <div className={"page-container"}>
            <Container>
                <h1>Builder Hub</h1>
				<div>
				We will fill this page with lists of in-progress and completed class layouts and rosters. It will also link to other "Create" pages.
				</div>
                <br/>
                <h2>Seating Layouts</h2>
                <ExpandableTable
                    data={props.layouts}
                    elementType={"Layout"}
                    //tableSetting={"table-hover"}
                    tableSetting={"customTable"}
                />
                <br/>
                <h2>Class Rosters</h2>
                <ExpandableTable
                    data={props.rosters}
                    elementType={"Roster"}
                    //tableSetting={"table-hover"}
                    tableSetting={"customTable"}
                />
            </Container>
        </div>
    );
}

export default Hub;

