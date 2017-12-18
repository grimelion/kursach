import React, { Component } from 'react'
import { Form, Text } from 'react-form';
// import { User } from '../../db/models/models';
import sha256 from 'sha256';

export default class Login extends Component {
  successValidator(values) {

    const sessionID = sha256(values.login);
    window.localStorage.setItem('sessionID', sessionID);
    // window.location.href = '/';
  };

  render() {
    return (
      <div style={{ margin:20 }}>
        <h2> Log in please! </h2><br/><br/>
        <Form onSubmit={ submittedValues => this.successValidator(submittedValues) }>
        { formApi => (
          <form onSubmit={ formApi.submitForm } id='form1'>
            <label htmlFor='login'>Login: </label>
            <Text field='login' id='login' /><br/><br/>
            <label htmlFor='firstName'>First name: </label>
            <Text field='firstName' id='firstName' /><br/><br/>
            <label htmlFor='lastName'>Last name: </label>
            <Text field='lastName' id='lastName' /><br/><br/>
            <label htmlFor='phone'>Contact phone: </label>
            <Text field='phone' id='phone' /><br/><br/>
            <button type='submit'>Submit</button>
          </form>
        )}
        </Form>
      </div>
    )
  }
}