import React, {useEffect} from 'react';
import {k_home_link} from "../CustomNavbar";
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
                <h1>Home</h1>
            </Container>
        </div>
    );
}

export default Home;
