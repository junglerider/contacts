import React from 'react'
import Button from 'react-bootstrap/Button'
import ContactList from './components/ContactList'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import api from './api'

function App() {
  const [list, setList] = React.useState(api.load())

  const addRandomContact = () => {
    setList(api.addRandom())
  }

  const onDelete = (index: number) => {
    setList(api.delete(index))
  }

  return (
    <div className="app-container">
      <div className="caption">Contacts</div>
      <div className="content-container">
        <ContactList
          contacts={list}
          onDelete={onDelete}
        />
      </div>
      <div className="form-button-container">
        <Button variant="success" className="button" style={{marginRight: "2%"}}>Add New</Button>
        <Button variant="info" className="button" onClick={addRandomContact}>Add Random</Button>
      </div>
    </div>
  )
}

export default App;
