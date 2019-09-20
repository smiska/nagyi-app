import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app'
import './main.scss'
import someService from './someService'

ReactDOM.render(
    <App someService={someService} />,
    document.getElementById('react-app')
)