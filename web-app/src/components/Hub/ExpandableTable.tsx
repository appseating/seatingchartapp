import React from "react";
import "./TableStyle.css";
import {Layout, Roster, Seating} from "../Interfaces/DataModel";
import Table from 'react-bootstrap/Table'

interface TableProps {
    data: Array<any>;
    tableSetting: string;
}

class ExpandableTable extends React.Component<TableProps> {
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
                        const {name, id, date, image} = this.props.data[i];
                        row.push(<td align="left">{name}</td>);
                        row.push(<td align="left">{date.toLocaleDateString()}</td>);
                        table.push(<tr key={counter++} className={"no-bottom"}>{row}</tr>);

                        // TODO: show image for Layout
                        row = [] as JSX.Element[];
                        row.push(<td align="center">{image}</td>);
                        row.push(<td></td>);
                        table.push(<tr key={counter++} className={"bottom"}>{row}</tr>);
                        break;
                    }

                    case this.props.data[i] instanceof Roster: {
                        const {name, id, students, nextStudentID, seatings, date} = this.props.data[i];
                        row.push(<td align="left">{name}</td>);
                        row.push(<td align="left">{date.toLocaleDateString()}</td>);
                        table.push(<tr key={counter++} className={"top no-bottom"}>{row}</tr>);

                        for (let j = 0; j < this.props.data[i].seatings.length; j++) {
                            row = [] as JSX.Element[];
                            const {name, id, groups, layoutID, SeatingID, date} = this.props.data[i].seatings[j];
                            row.push(<td align="left">{spacer}{name}</td>);
                            row.push(<td align="left">{date.toLocaleDateString()}</td>);
                            table.push(<tr key={counter++} className={"no-bottom"}>{row}</tr>);
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


/*
class ExpandableTable extends React.Component<TableProps> {
    renderData(value: any) {
        const dataString : String = "";
        switch(true) {
            case (value instanceof Layout): {
                const {name, id, date} = value;
                return (
                    <tr key={id}>
                        <td align="left">{name}</td>
                        <td align="right">{date.toLocaleString()}</td>
                    </tr>
                );
            }
            case value instanceof Roster: {
                const {name, id, students, nextStudentID, seatings, date} = value;
                // we use <>...</> React.Fragments to wrap two expressions into one.
                return (
                    <>
                        <tr key={id}>
                            <td align="left">{name}</td>
                            <td align="right">{date.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <Table
                                    data={seatings}
                                />
                            </td>
                        </tr>
                    </>
                );
            }
            case value instanceof Seating: {
                const {name, id, groups, layoutID, SeatingID, date} = value;
                return (
                    <tr key={id}>
                        <td align="left">{name}</td>
                        <td align="right">{date.toLocaleString()}</td>
                    </tr>
                );
            }
        }
        return(<tr><td>Unsupported DataType was inputted.</td></tr>);
    }

    renderTableData() {
        return this.props.data.map((subData) => {
            return(
                this.renderData(subData)
            );
        })
    }

    render() {
        return (
            <div>
                <h1 id='title'>{ this.props.title }</h1>
                <table id='rows'>
                    <thead>
                        <tr>
                            <th className="name">Name</th>
                            <th className="date">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        );
    }
}
*/

export default ExpandableTable;