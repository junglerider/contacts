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

  delete: (index: number) => {
    const contacts = api.load()
    if (typeof contacts[index] !== 'undefined') {
      contacts.splice(index)
    }
    api.save(contacts)
  },

  add: (contact: Contact) => {
    const contacts = api.load()
    contacts.push(contact)
    api.save(contacts)
  },

  addRandom: () => {
    api.add({
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      isFavorite: false
    })
  },
}

export default api