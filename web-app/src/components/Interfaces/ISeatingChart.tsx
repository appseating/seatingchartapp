import ITableGroup from "./ITableGroup";

export default interface ISeatingChart {
    id: string;
    name: string;
    numRows: number,
    numColumns: number,
    tableGroups: Array<ITableGroup>;
}