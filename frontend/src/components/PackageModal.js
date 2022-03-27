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
            activePackage: this.props.activePackage,
        };
    }

    handleChange = (e) => {
        let { name, value } = e.target;

        const activePackage = { ...this.state.activePackage, [name]: value };

        this.setState({ activePackage });
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
                                value={this.state.activePackage.path}
                                onChange={this.handleChange}
                                placeholder="Enter Package name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="todo-description">Description</Label>
                            <Input
                                type="text"
                                id="todo-description"
                                name="description"
                                value={this.state.activePackage.description}
                                onChange={this.handleChange}
                                placeholder="Enter Package description"
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        onClick={() => onSave(this.state.activePackage)}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}