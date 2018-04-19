import React, { Component } from 'react';
import Auth from '../../modules/Auth';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
  Redirect
} from 'react-router-dom';
import { S1_URL_REGISTER, HEADER } from '../../constants/';
import axios from 'axios';

class Register1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: true,
      name: "",
      email: "",
      password: "",
      error: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.modalLoginToggle = this.modalLoginToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  modalLoginToggle() {
    this.setState({
      modal: !this.state.modal
    });
    this.props.history.push('/');
  }

  componentDidMount() {
    // check if user is logged in on refresh
    this.props.toggleAuthenticateStatus()
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    axios.post(S1_URL_REGISTER, {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    },{
      HEADER
    })
    .then((response) => {
      if(response.data.success == true){
        this.props.history.push('/server1/login');
      }
      else{
        this.setState({error: response.error});
      }
    })
    .catch((error) => {
      console.log(error);
      this.setState({error: error});
    });
    
  }

  render() {
    return(
      <Modal isOpen={this.state.modal} toggle={this.modalLoginToggle} >
        <ModalHeader toggle={this.modalLoginToggle}>Register</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input type="text" id="name" placeholder="Enter Name" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Input type="email" id="email" placeholder="Enter Email" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Input type="password" id="password" placeholder="Enter Password" onChange={this.handleChange}/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          {this.state.error ? ("Error.  "+ this.state.error) : ("")}
          <Button color="primary" onClick={this.handleSubmit}>Register</Button>{' '}
          <Button color="secondary" onClick={this.modalLoginToggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      );
  }
}

export default Register1;