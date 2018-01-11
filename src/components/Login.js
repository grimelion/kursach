import React, { Component } from 'react'
import { Form, Text } from 'react-form';
import sha256 from 'sha256';
import axios from 'axios';

export default class Login extends Component {

  successValidator(values) {
    axios.post('/auth', values).then(res => {
      window.localStorage.setItem('sessionID', res.data);
      window.location.href = '/';
    });
  };

  render() {
    return (
      <div style={{ margin:20 }}>
        <h2> Log in please! </h2><br/><br/>
        <Form onSubmit={ submittedValues => this.successValidator(submittedValues) }>
        { formApi => (
          <form onSubmit={ formApi.submitForm } id='form1'>
            <label htmlFor='email'>Email: </label>
            <Text field='email' type='email' id='email' /><br/><br/>
            <label htmlFor='password'>Password: </label>
            <Text field='password' type='password' id='password' /><br/><br/>
            <button type='submit'>Submit</button>
          </form>
        )}
        </Form>
      </div>
    )
  }
}