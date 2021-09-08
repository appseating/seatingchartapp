import { v4 as uuidv4 } from 'uuid';
import { Image } from 'p5';
import { Table } from "../CreateLayout/GridCanvas";

class IdentifierObject {
    public id: string;

    constructor() {
        this.id = uuidv4();
    }

    // equal iff their ids are equal
    public equals(obj: IdentifierObject) : boolean {
        return (obj && this.id === obj.id);
    }
}

export class Student extends IdentifierObject {
    constructor(
        public name: string | null = null,
        public grade: number | null = null,
        public gender: number | null = null,
        public prefFriends: string[] = [],
        public groupPref: number[] = []
    ) { super(); }
}

export class Layout extends IdentifierObject {
    constructor(
        public name: string = "New Layout",
        public date: Date = new Date(),              // current date by default
        public image: string = "base64imagedata",
        public tables: Map<number, Table[]> = new Map()
    ) { super(); }
}

// note: does not contain students, but rather id references to students
export class Group {
    constructor(
        public name: string | null = null,
        public studentIDs: number[] = []
    ) {}
}

// note: does not contain layouts, but rather id references to layouts
export class Seating extends IdentifierObject {
    constructor(
        public name: string | null = null,
        public groups: Group[] = [],
        public layoutID: number | null = null,
        public date: Date = new Date()              // current date by default
    ) { super(); }
}

export class Roster extends IdentifierObject {
    constructor(
        public name: string | null = null,
        public students: Map<string, Student> = new Map(),
        public seatings: Seating[] = [],
        public date: Date = new Date()              // current date by default
    ) { super(); }

    addStudent(s: Student){
        this.students.set(s.id, s);
    }
}

export class ApplicationState {
    constructor(
        public layouts: Layout[] = [],
        public rosters: Roster[] = []
    ) {}
}