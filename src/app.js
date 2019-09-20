import React from 'react'

alert('App')

export const App = (someService) => {
    someService.handleError()
    return <button>I am app</button>
}