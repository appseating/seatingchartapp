import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {k_home_link, k_hub_link} from "../CustomNavbar";
import {Container} from "react-bootstrap";

interface HomeProps {
    screen: string;
    setScreen: Function;
    user: any;
}

const Home: React.FC<HomeProps> = (props: HomeProps) => {
    useEffect(() => {
        props.setScreen(k_home_link);
    }, [props]);

    return (
        <div className={"page-container"}>
            <Container>
				<h1>Improved Seating Charts</h1>
                <div>
                    Improved Seating Charts is an app to assist educators in creating seating charts easily and quickly. We support the following features:
                    <ul>
                        <li> Import class rosters from CSV files.</li>
                        <li> Automatically arrange students by gender ratio, grades, past performance, student preferences, and medical issues.</li>
                        <li> Export seating charts in a printable format.</li>
                    </ul>
                </div>
                <div>
                    <Link to={k_hub_link} className="btn btn-primary">Start now!</Link>
                </div>
            </Container>
        </div>
    );
}

export default Home;
