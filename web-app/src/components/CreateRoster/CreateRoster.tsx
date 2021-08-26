import React, { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import '../index.css';
import Table from 'react-bootstrap/Table'
import EditableTable from './EditableTable'
import { parse } from 'dotenv/types';
import {ApplicationState, Layout, Roster, Student} from '../Interfaces/DataModel'
import Papa from 'papaparse';
import { Button, Container } from 'react-bootstrap';
import {useLocation} from "react-router-dom";


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
            if (value.toLowerCase().trim() == 'male') {
                student.gender = -1
            }
            else if (value.toLowerCase().trim() == 'female') {
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

function saveTable(table: string[][]) {
    let r = new Roster()

    for (let i = 1; i < table.length; i++) {
        let s = new Student()
        for (let j = 0; j < table[i].length; j++) {
            parseAttribute(s, table[0][j], table[i][j])
        }
        r.addStudent(s)
    }

    console.log('Table')
    console.log(table)
    console.log('Roster')
    console.log(r)
}

interface PassedState {
    fromHub: boolean;
    roster: Roster;
}

interface CreateRosterProps {
    screen: string;
    setScreen: Function;
    user: any;
}

export default function CreateRoster(props: CreateRosterProps) {
    // Roster prop passed by Hub page.
    const location = useLocation();
    const { fromHub, roster } = location.state as PassedState || {fromHub: false, roster: null};
    console.log(fromHub);
    console.log(roster);

    useEffect(() => {
        props.setScreen('/create_roster');
    }, [props]);

    const [table, setTable] = useState([] as string[][])

    console.log(table.length)

    return (
        <div className={"page-container"}>
            <Container>
                <h1>Create Roster</h1>
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

                            <Button variant="primary" onClick={() => saveTable(table)}>Save</Button>{' '}
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

