
export class Student {
    id?: number
    name?: string
    grade?: number
    gender?: number
    prefFriends: string[] = []
    groupPref: number[] = []
}

export class Layout{
    id: number | null = null
    name: string | null = null
    // TODO: graphical representation
}

// note: does not contain students, but rather id references to students
export class Group {
    name: string | null = null
    studentIDs: number[] = []
}

// note: does not contain layouts, but rather id references to layouts
export class Seating {
    name: string | null = null
    groups: Group[] = []
    layoutID: number | null = null
}

export class Roster {
    students: Map<number, Student> = new Map()
    nextStudentID: number = 0
    seatings: Seating[] = []

    addStudent(s:Student){
        s.id  = this.nextStudentID
        this.students.set(this.nextStudentID++, s)
    }
}

export class ApplicationState {
    rosters: Roster[] = []
    layouts: Map<Layout, Student> = new Map()
    nextLayoutID: number = 0
}