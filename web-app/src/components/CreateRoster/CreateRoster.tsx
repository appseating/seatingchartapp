import React, { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
// import Table from 'react-bootstrap/Table'
import EditableTable, { ControlledInput } from './EditableTable'
import {Layout, Roster, Student} from '../Interfaces/DataModel'
import Papa from 'papaparse';
import { Button, Container } from 'react-bootstrap';
import {useLocation} from "react-router-dom";
import {k_create_roster_link} from "../CustomNavbar";
import {k_layouts, k_rosters, saveToStorage} from "../../utils/Storage";


async function handleFile(e: ChangeEvent<HTMLInputElement>, output: (res: string[][]) => void) {
    const text = await e.target.files![0].text()
    const res = Papa.parse(text, { skipEmptyLines: 'greedy' })

    output(res.data as string[][])

    e.target.value = ''
}

interface ImportCSVProps {
    callBack: (res: string[][]) => void
}

function ImportCSV(props: ImportCSVProps) {
    return (
        <input type="file" onChange={(e) => handleFile(e, props.callBack)} />
    )
}

function parseAttribute(student: Student, attrName: string, value: string) {
    const sl = attrName.toLowerCase().trim()

    switch (sl) {
        case 'name':
            student.name = value
            break
        case 'grade':
            student.grade = parseFloat(value)
            break
        case 'gender':
            if (value.toLowerCase().trim() === 'male') {
                student.gender = -1
            }
            else if (value.toLowerCase().trim() === 'female') {
                student.gender = 1
            }
            else {
                student.gender = 0
            }
            break
        case 'friends':
            student.prefFriends = value.split(',')
            break
        case 'group':
            student.groupPref = value.split(',').map(x => parseInt(x))
            break
    }

}

function saveTable(roster: Roster, table: string[][], props: CreateRosterProps, name: string) {
    // update roster with user input
    console.log(roster)
    roster.students = {}
    for (let i = 1; i < table.length; i++) {
        let s = new Student()
        for (let j = 0; j < table[i].length; j++) {
            parseAttribute(s, table[0][j], table[i][j])
        }
        roster.addStudent(s)
    }
    roster.table = table
    roster.name = name

    let i: number = props.rosters.indexOf(roster);        // this checks by UUID of roster
    if(i === -1) {
        props.rosters.push(roster);
        console.log("Saved new roster");
    } else {
        props.rosters[i] = roster;
        console.log(roster);
        console.log("Updated roster " + i);
    }
    props.setRosters(props.rosters);
    saveToStorage(k_rosters, props.rosters);

    console.log('Table:')
    console.log(table)
    console.log('Roster:')
    console.log(roster)
    console.log('Rosters:')
    console.log(props.rosters);
}

interface PassedState {
    fromHub: boolean;
    rosterID: string;
}

interface CreateRosterProps {
    screen: string;
    setScreen: Function;
    user: any;
    rosters: Roster[];
    setRosters: Function;
}

export default function CreateRoster(props: CreateRosterProps) {
    // Roster prop passed by Hub page.
    const location = useLocation();
    const { fromHub, rosterID } = location.state as PassedState || {fromHub: false, rosterID: ""};
    console.log(fromHub);
    console.log(rosterID);
    let roster = new Roster();
    if(props.rosters !== undefined) {
        for(let i = 0; i < props.rosters.length; i++)
            if(props.rosters[i].id === rosterID) {
                roster = props.rosters[i];
                break;
            }
    }
    console.log(roster);
    console.log(props.rosters);

    useEffect(() => {
        props.setScreen(k_create_roster_link);
    }, [props]);

    const [table, setTable] = useState(roster.table as string[][])
    const [name, setName] = useState(roster.name as string)
    console.log(table.length)

    return (
        <div className={"page-container"}>
            <Container>
                <h1>Create Roster</h1>
                <ControlledInput value={name} setData={setName}/>
                <ImportCSV callBack={
                    (res: string[][]) => { setTable(res) }
                } />

                {
                    (table.length > 0) &&
                    (
                        <div>
                            <EditableTable
                                data={table}
                                setData={(i, j, value) => setTable(
                                    (prevState) => {
                                        let copy = prevState.map(x => x.slice())
                                        copy[i][j] = value
                                        return copy
                                    }
                                )}
                            />

                            <Button variant="primary" onClick={() => saveTable(roster, table, props, name)}>Save</Button>{' '}
                        </div>
                    )
                }
            </Container>
        </div>
    )
}








// function generateValidators(header: string[]){
//     let validators: ((s: string) => string)[] = []

//     for (const s of header){
//         const sl = s.toLowerCase().trim()

//         switch(sl){
//             case 'name':

//                 break
//             case 'grade':

//                 break
//             case 'gender':
//                 break
//             case 'friends':
//                 break
//             case 'group':
//                 break


//         }
//     }

//     return validators
// }

