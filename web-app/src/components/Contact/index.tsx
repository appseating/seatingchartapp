import React, {useEffect} from 'react';
import {k_contact_link} from "../CustomNavbar";
import {Container} from "react-bootstrap";

interface HomeProps {
    screen: string;
    setScreen: Function;
    user: any;
}

const Contact = (props: HomeProps) => {
    useEffect(() => {
        props.setScreen(k_contact_link);
    }, [props]);

    return (
        <div className={"page-container"}>
            <Container>
                <h1>Contact</h1>
            </Container>
        </div>
    );
}

export default Contact;
