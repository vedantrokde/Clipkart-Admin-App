import React from 'react'
import { Modal, Button } from 'react-bootstrap'

/**
* @author
* @function NewModal
**/

const NewModal = (props) => {
    return (
        <Modal size={props.size} show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            {
                props.buttons ?
                    <Modal.Footer>
                        {
                            props.buttons.map((btn, ind) =>
                                <Button key={ind} variant={btn.color} onClick={btn.onClick}>{btn.label}</Button>
                            )
                        }
                    </Modal.Footer>
                    :
                    props.buttonName ?
                        <Modal.Footer>
                            <Button variant="primary" onClick={props.handleSave}>{props.buttonName}</Button>
                        </Modal.Footer>
                        :
                        null
            }
        </Modal>
    )
}

export default NewModal