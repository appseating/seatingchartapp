import IStudent from "./IStudent";

export default interface ITableGroup {
    id: string;
    name: string;
    row: number;
    column: number;
    students: Array<IStudent>;
}