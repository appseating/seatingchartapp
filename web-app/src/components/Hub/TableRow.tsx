import React from "react";
import { Layout, Seating, Roster } from "../Interfaces/DataModel";
import "./CustomStyle.css";
import Table from "./Table";

interface TableRowProps {
    data: any;
}

class TableRow extends React.Component<TableRowProps> {
    renderData(value: any) {
        switch(true) {
            case value instanceof Layout: {
                const {id, name} = value;
                return (
                    <tr key={id}>
                        <td>{name}</td>
                    </tr>
                );
            }
            case value instanceof Roster: {
                const {name, id, students, nextStudentID, seatings} = value;
                // we use <>...</> React.Fragments to wrap two expressions into one.
                return (
                    <>
                        <tr key={id}>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td>
                                <Table
                                    data={seatings}
                                />
                            </td>
                        </tr>
                    </>
                );
            }
            case value instanceof Seating: {
                const {name, id, groups, layoutID, SeatingID} = value;
                return (
                    <tr key={id}>
                        <td>{name}</td>
                    </tr>
                );
            }
        }
        return(<tr><td>Unsupported DataType was inputted.</td></tr>);
    }

    render() {
        const dataCopy = this.props.data;   // idk how to put this.props.data directly into renderData
        return(
            this.renderData(dataCopy)
        );
    }
}

export default TableRow;