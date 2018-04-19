import React, { Component } from 'react';
import Auth from '../../modules/Auth';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
  Redirect
} from 'react-router-dom';
import { S1_URL_LOGIN, HEADER } from '../../constants/';
import axios from 'axios';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: true,
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
    axios.post(S1_URL_LOGIN, {
      email: this.state.email,
      password: this.state.password
    },{
      HEADER
    })
    .then((response) => {
      console.log("inside login1"+response)
      Auth.authenticateUser(response.data.token);
      Auth.setName(response.data.name);
      Auth.setEmail(response.data.user);
      this.props.history.push('/server1');
    })
    .catch((error) => {
      console.log(error);
      this.setState({error: error});
    });
    
  }

  render() {
    return(
      <Modal isOpen={this.state.modal} toggle={this.modalLoginToggle} >
        <ModalHeader toggle={this.modalLoginToggle}>Login</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input type="email" id="email" placeholder="Enter Email" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Input type="password" id="password" placeholder="Enter Password" onChange={this.handleChange}/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          {this.state.error ? ("Login error.  "+ this.state.error) : ("")}
          <Button color="primary" onClick={this.handleSubmit}>Login</Button>{' '}
          <Button color="secondary" onClick={this.modalLoginToggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      );
  }
}

export default Login;