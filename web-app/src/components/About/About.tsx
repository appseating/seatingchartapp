import React, {useEffect} from 'react';
import {k_about_link} from "../CustomNavbar";
import {Container} from "react-bootstrap";

interface AboutProps {
    screen: string;
    setScreen: Function;
    user: any;
}

const About: React.FC<AboutProps> = (props: AboutProps) => {
    useEffect(() => {
        props.setScreen(k_about_link);
    }, [props]);

    return (
        <div className={"page-container"}>
            <Container>
                <h1>About</h1>
            </Container>
        </div>
    );
}

export default About;
