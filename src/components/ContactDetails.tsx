import React from 'react'
import api, { Contact } from '../api'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export interface ContactDetailsProps {
  contactIndex: number,
  show: boolean,
  onHide: () => void,
  onSave: (contact: Contact, index: number) => void
}

const newContact: Contact = {
  name: '',
  email: '',
  phone: '',
  isFavorite: false
}

const ContactDetails = (props: ContactDetailsProps) => {

  const [contact, setContact] = React.useState(newContact)
  const [validated, setValidated] = React.useState(false)

  React.useEffect(() => {
    if (props.contactIndex >= 0) {
      const contacts: Contact[] = api.load()
      setContact(contacts[props.contactIndex])
    } else {
      setContact(newContact)
    }
  }, [props.contactIndex])

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      props.onSave(contact, props.contactIndex)
    }
    setValidated(true)
  }

  const onChangeContact = (event: React.ChangeEvent<any>, prop: string) => {
    setContact({...contact, [prop]: event.target.value})
    setValidated(false)
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="cidName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Person's name"
              value={contact.name}
              onChange={event => onChangeContact(event, 'name')}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="cidEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Person's email address"
              value={contact.email}
              onChange={event => onChangeContact(event, 'email')}
            />
            <Form.Control.Feedback type="invalid">
              Please provide an email address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="cidPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone number"
              value={contact.phone}
              onChange={event => onChangeContact(event, 'phone')}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Cancel</Button>
          <Button type="submit" variant="primary">Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default ContactDetails