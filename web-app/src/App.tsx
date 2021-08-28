import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";
import CustomNavbar, {
    k_about_link,
    k_contact_link,
    k_create_seating_chart_link,
    k_home_link, k_hub_link,
    k_create_roster_link,
    k_create_layout_link
} from "./components/CustomNavbar";
import Home from "./components/Home";
import About from "./components/About/About";
import Contact from "./components/Contact";
import CreateSeatingChart from "./components/CreateSeatingChart";
import Hub from "./components/Hub";
import CreateRoster from './components/CreateRoster/CreateRoster';
import CreateLayout from "./components/CreateLayout";
import {k_layouts, k_rosters, readFromStorage, saveToStorage} from "./utils/Storage";

const App: React.FC = () => {
    const [screen, setScreen] = useState<string>("App");
    const [user, setUser] = useState<any>(undefined);

    const [layouts, setLayouts] = useState<Array<any>>([]);
    const [rosters, setRosters] = useState<Array<any>>([]);

    useEffect(() => {
        // load in layouts and rosters from local storage when app starts
        let savedLayouts = readFromStorage(k_layouts) || [];
        let savedRosters = readFromStorage(k_rosters) || [];

        if(savedLayouts instanceof Array) {
            setRosters(savedLayouts);
        }
        if(savedRosters instanceof Array) {
            setRosters(savedRosters);
        }
    }, []);

    useEffect(() => {
        // save latest rosters changes to local storage
        saveToStorage(k_layouts, layouts);
        saveToStorage(k_rosters, rosters);
    }, [layouts, rosters]);

    return (
        <Router>
            <CustomNavbar screen={screen} setScreen={setScreen} user={user}/>

            <Switch>
                <Route path={k_home_link}>
                    <Home screen={screen} setScreen={setScreen} user={user}/>
                </Route>
                <Route path={k_create_seating_chart_link}>
                    <CreateSeatingChart screen={screen} setScreen={setScreen} user={user} layouts={layouts} rosters={rosters}/>
                </Route>
                <Route path={k_about_link}>
                    <About screen={screen} setScreen={setScreen} user={user}/>
                </Route>
                <Route path={k_contact_link}>
                    <Contact screen={screen} setScreen={setScreen} user={user}/>
                </Route>
				<Route path={k_hub_link}>
                    <Hub screen={screen} setScreen={setScreen} user={user} layouts={layouts} rosters={rosters}/>
                </Route>
                <Route path={k_create_roster_link}>
                    <CreateRoster screen={screen} setScreen={setScreen} user={user} rosters={rosters}/>
                </Route>
                <Route path={k_create_layout_link}>
                    <CreateLayout screen={screen} setScreen={setScreen} user={user} layouts={layouts}/>
                </Route>
                <Redirect to={k_home_link}/>
            </Switch>
        </Router>
    );
}

export default App;
