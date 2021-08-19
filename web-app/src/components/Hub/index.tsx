import React, {useEffect} from 'react';
import {k_hub_link} from "../Home";
import {Container} from "react-bootstrap";

interface HomeProps {
    screen: string;
    setScreen: Function;
    user: any;
}

const Hub = (props: HomeProps) => {
    useEffect(() => {
        props.setScreen(k_hub_link);
    }, [props]);

    return (
        <div className={"page-container"}>
            <Container>
                <h1>Builder Hub</h1>
				<div>
				We will fill this page with lists of in-progress and completed class layouts and rosters. It will also link to other "Create" pages.
				</div>
            </Container>
        </div>
    );
}

export default Hub;

