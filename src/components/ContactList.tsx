import React from 'react'
import { Contact } from '../api'
import Table from 'react-bootstrap/Table';
import { NotStarredIcon, PenIcon, TrashIcon, } from './Icons'

export interface ContactListProps {
  contacts: Contact[]
  onDelete: Function
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
        {props.contacts.map((contact: Contact, index) =>
          <tr key={index.toString()}>
            <td><NotStarredIcon onClick={() => {console.log('click')}}/></td>
            <td>{contact.name}</td>
            <td><a href={"mailto:" + contact.email}>{contact.email}</a></td>
            <td>{contact.phone || ''}</td>
            <td><PenIcon/></td>
            <td><TrashIcon onClick={() => { props.onDelete(index) }} /></td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default ContactList;