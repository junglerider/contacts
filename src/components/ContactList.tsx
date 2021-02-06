import React from 'react'
import { Contact } from '../api'
import Table from 'react-bootstrap/Table'
import { NotStarredIcon, StarredIcon, PenIcon, TrashIcon, } from './Icons'

export interface ContactListProps {
  contacts: Contact[],
  filterFavorites: boolean,
  onDelete: (index: number) => void,
  onEdit: (index: number) => void,
  onToggleFavorite: (index: number) => void,
}

const ContactList = (props: ContactListProps) => {

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.contacts
          .map((contact: Contact, index) => {
            if (!props.filterFavorites || contact.isFavorite) {
              return (
                <tr key={index.toString()}>
                  <td>{
                    contact.isFavorite ?
                      <StarredIcon onClick={() => { props.onToggleFavorite(index) }} /> :
                      <NotStarredIcon onClick={() => { props.onToggleFavorite(index) }} />
                  }</td>
                  <td>{contact.name}</td>
                  <td><a href={"mailto:" + contact.email}>{contact.email}</a></td>
                  <td>{contact.phone || ''}</td>
                  <td><PenIcon onClick={() => { props.onEdit(index) }} /></td>
                  <td><TrashIcon onClick={() => { props.onDelete(index) }} /></td>
                </tr>
              )
            }
            return null
          })
        }
      </tbody>
    </Table>
  )
}

export default ContactList