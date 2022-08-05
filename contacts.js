const fs = require('fs').promises;
const path = require('path');
const {v4} = require('uuid');


const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
} catch (error) {
    console.log(error.message);
}
}

async function getContactById(contactId) {
 try {
     const contacts = await listContacts();
     const result = contacts.find(contact => contact.id === contactId);
     if (!result) {
         return null
     }
     return result;
} catch (error) {
    console.log(error.message);
}
}

async function removeContact(contactId) {
 try {
     const contacts = await listContacts();
     const idx = contacts.findIndex(contact => contact.id === contactId);
     if (idx === -1) {
         return null;
     };
     const [removedContact] = contacts.splice(idx, 1);
     await fs.writeFile(contactsPath, JSON.stringify(contacts));

     return removedContact;
} catch (error) {
    console.log(error.message);
}
}

async function addContact(name, email, phone) {
 try {
     const contacts = await listContacts();
     const newContact = {
         id: v4(),
         name,
         email,
         phone,
     };
     contacts.push(newContact);
     await fs.writeFile(contactsPath, JSON.stringify(contacts));
     return newContact;
} catch (error) {
    console.log(error.message);
}
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}