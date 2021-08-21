import React from "react";
import "./CustomStyle.css";
import TableRow from "./TableRow";

interface TableProps {
    data: Array<any>;
    title?: string;
}

class Table extends React.Component<TableProps> {
    renderTableData() {
        return this.props.data.map((subData) => {
            return(
                <TableRow
                    data={subData}
                />
            );
        })
    }

    render() {
        return (
            <div>
                <h1 id='title'>{ this.props.title }</h1>
                <table id='rows'>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;