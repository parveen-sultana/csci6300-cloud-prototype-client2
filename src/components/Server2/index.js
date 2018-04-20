import React, { Component } from 'react';
import Navigation from '../Navigation';
import Auth from '../../modules/Auth';
import axios from 'axios';
import { S2_URL_TECHNOLOGY_ADD, S2_URL_TECHNOLOGY_DELETE, S2_URL_TECHNOLOGY, BEARER_HEADER} from '../../constants'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Server2 extends Component {
  constructor(props) {
    super(props);
    this.navBarToggle = this.navBarToggle.bind(this);
    this.toggleAuthenticateStatus = this.toggleAuthenticateStatus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: "",
      message: "",
      technologyNames:[],
      isOpen: false,
      authenticated: Auth.isUserAuthenticated()
    };
  }

  navBarToggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentWillMount(){
    
  }

  componentDidMount() {
    // check if user is logged in on refresh
    this.props.toggleAuthenticateStatus()
  }
  
  toggleAuthenticateStatus() {
    // check authenticated status and toggle state based on that
    this.setState({ authenticated: Auth.isUserAuthenticated() })
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    console.log(BEARER_HEADER)
    console.log(S2_URL_TECHNOLOGY_ADD)
    event.preventDefault();
    axios.post(S2_URL_TECHNOLOGY_ADD, {
      name: this.state.name
    },
    {headers: BEARER_HEADER})
    .then((response) => {
      console.log("inside resp"+response)
      this.setState({message: "New Technology added to the List"})
    })
    .catch((error) => {
      console.log(error);
      this.setState({message: "Some Error"});
    });
    
  }

  handleView = event => {
    event.preventDefault();
    
    axios.get(S2_URL_TECHNOLOGY,{headers: BEARER_HEADER}
    ).then((response)=> {
      console.log("tech data"+response.data);
      var temp=[];
      for (var i = 0; i < response.data.length; i++) { 
        temp.push(response.data[i]["name"]);
        console.log("data is: "+temp);
      }
      this.setState({technologyNames: temp});
      console.log("data is: "+this.state.technologyNames);
    })
  }

  handleDelete = event => {
    event.preventDefault();
    axios.delete(S2_URL_TECHNOLOGY_DELETE+'/'+this.state.name,
    {headers: BEARER_HEADER})
    .then((response) => {
      console.log("inside resp"+response)
      this.setState({message: "Technology deleted from the List"})
    })
    .catch((error) => {
      console.log(error);
      this.setState({message: "Some Error"});
    });
    
  }

  render() {
    return(
      <div>
        <Navigation toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()}/>
        <h1>Successfully authenticated via Server2.</h1>
        {this.state.message}
        <Form>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" placeholder="Enter Name of a trending Technology" onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Button onClick={this.handleSubmit}>Add to List</Button>
          {" "}
          <Button onClick={this.handleView}>View List</Button>
          {" "}
          <Button onClick={this.handleDelete}>Delete an item</Button>
        </FormGroup>
        </Form>
        {this.state.technologyNames.map((name)=> <div>{name}</div>)}
      </div>
    )
  }
}

export default Server2;