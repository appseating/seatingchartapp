
export class Student {
    constructor(
        public id: number | null = null,
        public name: string | null = null,
        public grade: number | null = null,
        public gender: number | null = null,
        public prefFriends: string[] = [],
        public groupPref: number[] = []
    ) {}
}

export class Layout{
    constructor(
        public id: number | null = null,
        public name: string | null = null,
        // TODO: graphical representation
    ) {}
}

// note: does not contain students, but rather id references to students
export class Group {
    constructor(
        public name: string | null = null,
        public studentIDs: number[] = []
    ) {}
}

// note: does not contain layouts, but rather id references to layouts
export class Seating {
    constructor(
        public id: number | null = null,
        public name: string | null = null,
        public groups: Group[] = [],
        public layoutID: number | null = null
    ) {}
}

export class Roster {
    constructor(
        public id: number | null = null,
        public name: string | null = null,
        public students: Map<number, Student> = new Map(),
        public nextStudentID: number = 0,
        public seatings: Seating[] = []
    ) {}

    addStudent(s: Student){
        s.id  = this.nextStudentID
        this.students.set(this.nextStudentID++, s)
    }
}

export class ApplicationState {
    constructor(
        public rosters: Roster[] = [],
        public layouts: Map<Layout, Student> = new Map(),
        public nextRosterID: number = 0,
        public nextLayoutID: number = 0
    ) {}
}