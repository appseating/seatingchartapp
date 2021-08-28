import React, {useEffect, useState} from 'react';
import {k_create_seating_chart_link} from "../CustomNavbar";
import {Container} from "react-bootstrap";
import CustomCanvas from "./CustomCanvas";
import {Student, Group, Layout, Seating, Roster} from "../Interfaces/DataModel";
import {useLocation} from "react-router-dom";

interface PassedState {
    fromHub: boolean;
    roster: Roster;
    seating: Seating;
}

interface CreateSeatingChartProps {
    screen: string;
    setScreen: Function;
    user: any;
    layouts: Layout[];
    rosters: Roster[];
}

const CreateSeatingChart: React.FC<CreateSeatingChartProps> = (props: CreateSeatingChartProps) => {
    // Seating props passed by Hub page.
    const location = useLocation();
    const { fromHub, roster, seating } = location.state as PassedState || {fromHub: false, roster: null, seating: null};
    console.log(fromHub);
    console.log(roster);
    console.log(seating);

    // TODO: refactor code that uses below variables
    const [seatingChart, setSeatingChart] = useState<Layout | Seating | undefined>();

    useEffect(() => {
        props.setScreen(k_create_seating_chart_link);

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
        const Rosters : Roster[] = [Roster1, Roster2, Roster3];


        //setSeatingChart(Layout1);          // test Layout
        setSeatingChart(Seating1);          // test Seating
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
