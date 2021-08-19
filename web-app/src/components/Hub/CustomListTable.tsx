import React from "react";
import ISeatingChart from "../Interfaces/ISeatingChart";
import "./CustomStyle.css";

interface CustomListTableProps {
    seatingCharts: Array<ISeatingChart>;
    title: string;
}

class CustomListTable extends React.Component<CustomListTableProps> {
    constructor(props: CustomListTableProps) {
        super(props);
    }

    renderTableData() {
        return this.props.seatingCharts.map((seatingChart) => {
            const { id, name, numRows, numColumns, } = seatingChart;
            return(
                <tr key={id}>
                    <td>{name}</td>
                    <td>{numRows}</td>
                    <td>{numColumns}</td>
                </tr>

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

export default CustomListTable;