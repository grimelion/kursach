import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Main from './components/Main';
import NotFound from './components/NotFound';
import Login from './components/Login';
import './scss/style.scss';

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={ Main } />
			<Route path='/login' component={ Login } />
			<Route path='*' component={ NotFound } />
		</Switch>
	</BrowserRouter>,
	document.getElementById('root')
);