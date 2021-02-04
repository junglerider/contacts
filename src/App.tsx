import React from 'react'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <div className="caption">Contacts</div>
      <div className="form-button-container">
        <Button variant="success" className="button">Add New</Button>
      </div>
    </div>
  )
}

export default App;
