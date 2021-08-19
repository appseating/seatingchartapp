import IStudent from "./IStudent";

export default interface ITableGroup {
    id: string;
    name: string;
    students: Array<IStudent>;
}