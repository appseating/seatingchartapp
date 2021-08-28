import { v4 as uuidv4 } from 'uuid';

class IdentifierObject {
    public id: string;

    constructor() {
        this.id = uuidv4();
    }

    // equal iff their ids are equal
    public equals(obj: IdentifierObject) : boolean {
        return (this.id === obj.id);
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
        public name: string | null = null,
        public date: Date = new Date(),              // current date by default
        public image: string | null = "[Show image here]"
        // TODO: graphical representation
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
        public students: Map<string, Student> = new Map(),  // TODO: why not use an array? - Tae Kyu
        public seatings: Seating[] = [],
        public date: Date = new Date()              // current date by default
    ) { super(); }

    addStudent(s: Student){
        this.students.set(s.id, s);
    }
}

export class ApplicationState {
    constructor(
        //public layouts: Map<Layout, Student> = new Map(),
        public layouts: Layout[] = [],
        public rosters: Roster[] = []
    ) {}
}