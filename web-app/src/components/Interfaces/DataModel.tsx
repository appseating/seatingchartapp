
class Student {
    id: number | null = null
    name: string | null = null
    grade: number | null = null
    gender: number | null = null
    prefNames: string[] = []
    groupPref: number[] = []
}

class Layout{
    id: number | null = null
    name: string | null = null
    // TODO: graphical representation
}

// note: does not contain students, but rather id references to students
class Group {
    name: string | null = null
    studentIDs: number[] = []
}

// note: does not contain layouts, but rather id references to layouts
class Seating {
    name: string | null = null
    groups: Group[] = []
    layoutID: number | null = null
}

class Roster {
    students: Map<number, Student> = new Map()
    nextStudentID: number = 0
    seatings: Seating[] = []
}

export class ApplicationState {
    rosters: Roster[] = []
    layouts: Map<Layout, Student> = new Map()
    nextLayoutID: number = 0
}