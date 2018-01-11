import React, {Component} from 'react'
import {Form, Text} from 'react-form';
import axios from 'axios';

export default class Settings extends Component {

    successValidator(values) {
        const params = window
            .location
            .href
            .split('/');
        const id = params[params.length - 1];
        values['_id'] = id;
        axios
            .post('/settings', values)
            .then(res => {
                window.location.href = '/';
            });
    };

    render() {
        return (
            <div>
                <h2>
                    Settings:
                </h2><br/><br/>
                <Form onSubmit={submittedValues => this.successValidator(submittedValues)}>
                    {formApi => (
                        <form onSubmit={formApi.submitForm} id='form1'>
                            <label htmlFor='firstName'>First name:
                            </label>
                            <Text field='firstName' type='firstName' id='firstName'/><br/><br/>
                            <label htmlFor='lastName'>Last name:
                            </label>
                            <Text field='lastName' type='lastName' id='lastName'/><br/><br/>
                            <label htmlFor='phone'>Phone:
                            </label>
                            <Text field='phone' type='phone' id='phone'/><br/><br/>
                            <button type='submit'>Submit</button>
                        </form>
                    )}
                </Form>
            </div>
        )
    }
}