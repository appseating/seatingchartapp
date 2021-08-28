import React from "react";
import "./TableStyle.css";
import {k_create_layout_link, k_create_roster_link, k_create_seating_chart_link} from "../CustomNavbar";
import {Layout, Roster, Seating} from "../Interfaces/DataModel";
import Table from 'react-bootstrap/Table'
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

interface TableProps extends RouteComponentProps<any> {
    data: Array<any>;
    tableSetting: string;
}

class ExpandableTable extends React.Component<TableProps> {
    constructor(props : TableProps) {
        super(props);
    }

    handleOnClickLayout = (layoutData : Layout) => {
        this.props.history.push(k_create_layout_link, {
            fromHub: true,
            layout: layoutData
        });
    }
    handleOnClickRoster = (rosterData : Roster) => {
        this.props.history.push(k_create_roster_link, {
            fromHub: true,
            roster: rosterData
        });
    }
    handleOnClickSeating = (rosterData : Roster, seatingData : Seating) => {
        this.props.history.push(k_create_seating_chart_link, {
            fromHub: true,
            roster: rosterData,
            seating: seatingData
        });
    }

    render() {
        console.log('Rerender expandable table')
        let table = [] as JSX.Element[];

        // for spacing on sub-lists
        let spacer : string = "";
        const spacerWidth : number = 8;
        for(let i = 0; i < spacerWidth; i++) {
            spacer += "\u00A0"
        }

        if(Array.isArray(this.props.data)) {
            let counter : number = 0;
            for (let i = 0; i < this.props.data.length; i++) {
                let row = [] as JSX.Element[];
                switch (true) {
                    case (this.props.data[i] instanceof Layout): {
                        row.push(<td align="left">{this.props.data[i].name}</td>);
                        row.push(<td align="left">{this.props.data[i].date.toLocaleDateString()}</td>);
                        table.push(
                            <tr
                                key={this.props.data[i].id}
                                className={"no-bottom"}
                                onClick={() => this.handleOnClickLayout(this.props.data[i])}
                            >
                                {row}
                            </tr>
                        );

                        // TODO: show image for Layout
                        row = [] as JSX.Element[];
                        row.push(<td align="center">{this.props.data[i].image}</td>);
                        row.push(<td></td>);
                        table.push(
                            <tr key={counter++} className={"bottom"}>
                                {row}
                            </tr>
                        );
                        break;
                    }

                    case this.props.data[i] instanceof Roster: {
                        row.push(<td align="left">{this.props.data[i].name}</td>);
                        row.push(<td align="left">{this.props.data[i].date.toLocaleDateString()}</td>);
                        table.push(
                            <tr
                                key={this.props.data[i].id}
                                className={"top no-bottom"}
                                onClick={() => this.handleOnClickRoster(this.props.data[i])}
                            >
                                {row}
                            </tr>
                        );

                        for (let j = 0; j < this.props.data[i].seatings.length; j++) {
                            row = [] as JSX.Element[];
                            row.push(<td align="left">{spacer}{this.props.data[i].seatings[j].name}</td>);
                            row.push(<td align="left">{this.props.data[i].seatings[j].date.toLocaleDateString()}</td>);
                            table.push(
                                <tr
                                    key={this.props.data[i].seatings[j].id}
                                    className={"no-bottom"}
                                    onClick={() => this.handleOnClickSeating(
                                        this.props.data[i], this.props.data[i].seatings[j])}
                                >
                                    {row}
                                </tr>
                            );
                        }
                        break;
                    }

                    default: {
                        row.push(<td align="left">Unsupported data type was inputted.</td>);
                        table.push(<tr key={i}>{row}</tr>);
                    }
                }
            }
        } else {
            return (<tr><td>Unsupported data type was inputted.</td></tr>);
        }

        return (
            <Table className={ this.props.tableSetting }>
                <thead>
                    <tr>
                        <th className="name">Name</th>
                        <th className="date">Date Created</th>
                    </tr>
                </thead>
                <tbody>
                    {table}
                </tbody>
            </Table>
        );
    }
}

export default withRouter(ExpandableTable);