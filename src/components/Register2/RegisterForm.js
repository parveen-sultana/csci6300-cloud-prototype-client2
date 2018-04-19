import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
  Redirect
} from 'react-router-dom'


const RegisterForm = ({modal, modalRegisterToggle}) => (
  <Modal isOpen={modal} toggle={modalRegisterToggle} >
  <ModalHeader toggle={modalRegisterToggle}>Register</ModalHeader>
  <ModalBody>
    <Form>
    	<FormGroup>
        <Input type="text" name="name" id="exampleEmail" placeholder="Enter Name" />
      </FormGroup>
      <FormGroup>
        <Input type="email" name="email" id="exampleEmail" placeholder="Enter Email" />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="password" id="examplePassword" placeholder="Enter Password" />
      </FormGroup>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button color="primary" onClick={modalRegisterToggle}>Register</Button>{' '}
    <Button color="secondary" onClick={modalRegisterToggle}>Cancel</Button>
  </ModalFooter>
</Modal>
)

export default RegisterForm;