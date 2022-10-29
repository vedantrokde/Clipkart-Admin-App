import React from 'react'
import { Form } from 'react-bootstrap'

/**
* @author
* @function Input
**/

const Input = (props) => {
    return (
        <Form.Group className="mb-3">
            {props.label && (<Form.Label>{props.label}</Form.Label>)}
            <Form.Control 
                type={props.type}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange}
                min={props.min}
                max={props.max}
                step={props.step}
                multiple={props.multiple}
                {...props}
            />
            <Form.Text className="text-muted">
                {props.errorMessage}
            </Form.Text>
        </Form.Group>
    )
}

export default Input