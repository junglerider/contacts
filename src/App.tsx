import React from 'react'
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ContactList from './components/ContactList'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import api from './api'

function App() {
  const [list, setList] = React.useState(api.load())
  const [filterFavorites, setFilterFavorites] = React.useState(0)

  const addRandomContact = () => {
    setList(api.addRandom())
  }

  const onDelete = (index: number) => {
    setList(api.delete(index))
  }

  const onToggleFavorite = (index: number) => {
    if (typeof list[index] !== 'undefined') {
      list[index].isFavorite = !list[index].isFavorite
    }
    api.save(list)
    setList(api.load())
  }

  return (
    <div className="app-container">
      <div className="caption">Contacts</div>
      <div className="content-container">
        <ContactList
          contacts={list}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
          filterFavorites={Boolean(filterFavorites)}
        />
      </div>
      <div className="form-button-container">
        <Button
          variant="success"
          className="button"
          style={{ marginRight: "2%" }}
        >Add New
        </Button>
        <Button
          variant="info"
          className="button"
          style={{ marginRight: "2%" }}
          onClick={addRandomContact}
        >Add Random
        </Button>
        <ToggleButtonGroup
          type="radio"
          name="options"
          value={filterFavorites}
          onChange={setFilterFavorites}
        >
          <ToggleButton className="button" value={0}>Show All</ToggleButton>
          <ToggleButton className="button" value={1}>Show Favorites</ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  )
}

export default App;
