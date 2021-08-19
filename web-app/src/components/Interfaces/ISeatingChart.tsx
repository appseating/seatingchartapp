import ITableGroup from "./ITableGroup";

export default interface ISeatingChart {
    id: string;
    name: string;
    tableGroups: Array<ITableGroup>;
}