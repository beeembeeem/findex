import React, { Component } from 'react';
import signupSetting from "../settings/signup"
import { Auth } from 'aws-amplify';

global.fetch('node-fetch')

export default class signup extends Component {
  constructor(props) {
      super(props);

      this.state = {
          username: '',
          password: '',
          family_name: '',
          name: '',
          email: '',
          confirmationCode: '',
          verified: false,
          fields :  signupSetting.fields
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.signUp = this.signUp.bind(this);
      this.confirmSignUp = this.confirmSignUp.bind(this);
  }

  signUp() {
      const { username, password, email, name,family_name } = this.state;  
      Auth.signUp({
          username: username,
          password: password,
          attributes: {
              email: email,
              name: name,
              family_name : family_name
          }
      })
      .then(() => {
          console.log('Successfully signed up');
          this.setState({
            password: '',
            email: '',
            phone_number: '',
            verified: true
        });
      })
      .catch((err) => console.log(`Error signing up: ${ JSON.stringify(err) }`))
  }

  confirmSignUp() {
      console.log(this.state)
      const { username, confirmationCode } = this.state;
      Auth.confirmSignUp(username, confirmationCode)
      .then((result) => {
          console.log(result)
          console.log('Successfully confirmed signed up')
          this.setState({
            confirmationCode: '',
            username: ''
         });
         window.location.href = "/signin"
      })
      .catch((err) => console.log(`Error confirming sign up - ${ err }`))
  }

  handleSubmit = (e) => {
    const { verified } = this.state;

      e.preventDefault();

      if (verified) {
        this.confirmSignUp();

      } else {
        this.signUp();
        
      }
      e.target.reset();
  }

  handleConfirmChange = (event) =>{
       this.setState({
        confirmationCode : event.target.value
       }) 
   }
    handleSignUpChange = (event) => {
   this.state.fields.map(item =>{
     if(event.target.name === item.name){
      this.setState({
        [item.attr] : event.target.value
      }) 
     }     
   })
  }

  render() {
    const { verified } = this.state;
    if (verified) {
        return (
            <div>
                <form onSubmit={ this.handleSubmit }>
                    <label>Confirmation Code</label>
                    <input name = 'confirmationCode' id='confirmationCode' type='text' onChange={ this.handleConfirmChange }/>
                    <button>Confirm Sign up</button>
                </form>
            </div>
        );
    } else {
      return (
        <div>
              <div className='container'>
              <div className ="login-box w-50 mx-auto my-4 bg-light p-5">
        <form onSubmit={this.handleSubmit} >
        {signupSetting.fields.map(item =>
                  <div key = {item.id} className="form-group">
              <label >{item.label}</label>
                  <input name =  {item.name} type= {item.type} className="form-control" id= {item.id} placeholder= {item.placeholder} value={this.state.value} onChange={this.handleSignUpChange} ></input>
                </div>
              )}
        <button type="submit" className="btn btn-primary" value="Submit">Submit</button>
        </form></div></div>        </div>
      );
    }
  }
}
