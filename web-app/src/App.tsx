import React, {useEffect, useState} from 'react';
import {HashRouter as Router, Redirect, Route, Switch,} from "react-router-dom";
import CustomNavbar, {
    k_about_link,
    k_contact_link,
    k_create_seating_chart_link,
    k_home_link, k_hub_link
} from "./components/CustomNavbar";
import Home from "./components/Home";
import About from "./components/About/About";
import Contact from "./components/Contact";
import CreateSeatingChart from "./components/CreateSeatingChart";
import Hub from "./components/Hub";
import {k_rosters, readFromStorage} from "./utils/Storage";

const App: React.FC = () => {
    const [screen, setScreen] = useState<string>("App");
    const [user, setUser] = useState<any>(undefined);

    const [rosters, setRosters] = useState<Array<any>>([]);

    useEffect(() => {
        let savedRosters = readFromStorage(k_rosters) || [];

        if(savedRosters instanceof Array) {
            setRosters(savedRosters);
        }
    }, []);

    return (
        <Router>
            <CustomNavbar screen={screen} setScreen={setScreen} user={user}/>

            <Switch>
                <Route path={k_home_link}>
                    <Home screen={screen} setScreen={setScreen} user={user}/>
                </Route>
                <Route path={k_create_seating_chart_link}>
                    <CreateSeatingChart screen={screen} setScreen={setScreen} user={user}/>
                </Route>
                <Route path={k_about_link}>
                    <About screen={screen} setScreen={setScreen} user={user}/>
                </Route>
                <Route path={k_contact_link}>
                    <Contact screen={screen} setScreen={setScreen} user={user}/>
                </Route>
				<Route path={k_hub_link}>
                    <Hub screen={screen} setScreen={setScreen} user={user}/>
                </Route>
                <Redirect to={k_home_link}/>
            </Switch>
        </Router>
    );
}

export default App;
