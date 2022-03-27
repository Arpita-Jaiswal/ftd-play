import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeDocument: this.props.activeDocument,
        };
    }

    handleChange = (e) => {
        let { name, value } = e.target;

        const activeDocument = { ...this.state.activeDocument, [name]: value };

        this.setState({ activeDocument });
    };

    render() {
        const { toggle, onSave } = this.props;

        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Todo Item</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="todo-title">Title</Label>
                            <Input
                                type="text"
                                id="todo-title"
                                name="path"
                                value={this.state.activeDocument.path}
                                onChange={this.handleChange}
                                placeholder="Enter Document name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="todo-title">Base Path</Label>
                            <Input
                                type="text"
                                id="todo-title"
                                name="base_path"
                                value={this.state.activeDocument.base_path}
                                onChange={this.handleChange}
                                placeholder="Enter Document name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="todo-description">Content</Label>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="10"
                                name="content"
                                onChange={this.handleChange}
                            >
                                {this.state.activeDocument.content}
                            </textarea>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        onClick={() => onSave(this.state.activeDocument)}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}