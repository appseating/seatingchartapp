import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import '../index.css';
import Table from 'react-bootstrap/Table'

interface ControlledInputProps {
    value: string
    setData: (val: string) => void
    validation?: (s: string) => string
}

function ControlledInput(props: ControlledInputProps) {
    console.log('rerender input')
    const [value, setValue] = useState(props.value)

    // stale props
    useEffect(() => {setValue(props.value)}, [props.value])

    return (
        <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={(e) => props.setData(value)}
            onKeyDown={(e) => {
                if (["Enter", "Escape"].includes(e.key)) {
                    e.currentTarget.blur()
                }
            }}
        />
    )
}

interface EditableTableProps {
    data: string[][]
    setData: (i: number, j: number, val: string) => void
    validations?: ((s: string) => string)[]
}

export default function EditableTable(props: EditableTableProps) {
    console.log('rerender table')
    let table = [] as JSX.Element[]

    for (let i = 0; i < props.data.length; i++) {

        let row = [] as JSX.Element[]
        for (let j = 0; j < props.data[i].length; j++) {
            row.push(<td> <ControlledInput key={j}
                validation={props.validations != undefined ? props.validations[j] : undefined}
                value={props.data[i][j]}
                setData={(s: string) => { props.setData(i, j, s) }} /> </td>)
        }

        table.push(<tr key={i}>{row}</tr>)
    }

    return (
        <Table><tbody>{table}</tbody></Table>
    )
}
