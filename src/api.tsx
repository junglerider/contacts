import * as faker from 'faker'

export interface Contact {
  name: string,
  email: string,
  phone?: string,
  isFavorite: boolean
}

const api = {

  load: (): Contact[] => {
    const items: string|null = window.localStorage.getItem('contacts')
    return items ? JSON.parse(items) : []
  },

  save: (contacts: Contact[]) => {
    const contactsJson = JSON.stringify(contacts)
    window.localStorage.setItem('contacts', contactsJson)
  },

  delete: (index: number): Contact[] => {
    const contacts = api.load()
    if (typeof contacts[index] !== 'undefined') {
      contacts.splice(index, 1)
    }
    api.save(contacts)
    return contacts
  },

  add: (contact: Contact): Contact[] => {
    const contacts = api.load()
    contacts.push(contact)
    api.save(contacts)
    return contacts
  },

  addRandom: (): Contact[] => {
    return api.add({
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      isFavorite: false
    })
  },
}

export default api