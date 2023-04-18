import React, { useState } from "react";
import { Form } from 'react-bootstrap';

export function RoleDropdown(): JSX.Element{
    const ROLES = [
        "Basic",
        "Staff",
        "Faculty"
    ];
    const DEFAULT_ROLE = ROLES[0];
    const [roleType, setRoleType] = useState<string>(DEFAULT_ROLE);
    function changeRole(event: React.ChangeEvent<HTMLSelectElement>){
        setRoleType(event.target.value);
    }
    return (
        <div>
            <Form.Group controlId="roleSelect">
                <Form.Label>Choose your role</Form.Label>
                <Form.Select value={roleType} onChange={changeRole}>
                    {ROLES.map((role: string) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            {roleType === "Basic" ? <span>This is for basic</span> : null}
            {roleType === "Staff" ? <span>This is for staff</span> : null}
            {roleType === "Faculty" ? <span>This is for faculty</span> : null}
        </div>
    );
}
