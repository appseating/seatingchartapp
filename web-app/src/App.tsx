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
import {Layout} from "./components/Interfaces/DataModel";
import {Table} from "./components/CreateLayout/GridCanvas";

const App: React.FC = () => {
    const [screen, setScreen] = useState<string>("App");
    const [user] = useState<any>(undefined);

    const [layouts, setLayouts] = useState<Array<any>>([]);
    const [rosters, setRosters] = useState<Array<any>>([]);

    useEffect(() => {
        // load in layouts and rosters from local storage when app starts
        let savedLayouts: Array<any> = readFromStorage(k_layouts) || [];
        let savedRosters: Array<any> = readFromStorage(k_rosters) || [];

        if(savedLayouts instanceof Array) {
            setLayouts(savedLayouts);
        }

        if(savedRosters instanceof Array) {
            setRosters(savedRosters);
        }
    }, []);

    return (
        <Router>
            <CustomNavbar screen={screen} setScreen={setScreen} user={user}/>

            <Switch>
                <Route path={k_home_link} render={() => (
                    <Home screen={screen} setScreen={setScreen} user={user}/>
                )} />
                <Route path={k_create_seating_chart_link} render={() => (
                    <CreateSeatingChart screen={screen} setScreen={setScreen} user={user} layouts={layouts} rosters={rosters}/>
                )} />
                <Route path={k_about_link} render={() => (
                    <About screen={screen} setScreen={setScreen} user={user}/>
                )} />
                <Route path={k_contact_link} render={() => (
                    <Contact screen={screen} setScreen={setScreen} user={user}/>
                )} />
				<Route path={k_hub_link} render={() => (
                    <Hub screen={screen} setScreen={setScreen} user={user} layouts={layouts} rosters={rosters} setLayouts={setLayouts} setRosters={setRosters}/>
                )} />
                <Route path={k_create_roster_link} render={() => (
                    <CreateRoster screen={screen} setScreen={setScreen} user={user} rosters={rosters} setRosters={setRosters}/>
                )} />
                <Route path={k_create_layout_link} render={() => (
                    <CreateLayout screen={screen} setScreen={setScreen} user={user} layouts={layouts} setLayouts={setLayouts}/>
                )} />
                <Redirect to={k_home_link}/>
            </Switch>
        </Router>
    );
}

export default App;
