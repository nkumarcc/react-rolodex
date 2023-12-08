import { useState, useEffect } from 'react';

interface Contact {
    id: number;
    name: string;
}

const useContactList = () => {
  const [contactList, setContactList] = useState<Contact[]>(() => {
    const storedContactList = localStorage.getItem('contactList');
    return storedContactList ? JSON.parse(storedContactList) : [];
  });

  useEffect(() => {
    // Save contact list to local storage whenever it changes
    localStorage.setItem('contactList', JSON.stringify(contactList));
  }, [contactList]);

  const getContact = (contactId: number) => {
    return contactList.find((contact) => contact.id === contactId);
  }

  const addContact = (contact: Contact) => {
    setContactList((prevContactList: Contact[]) => [...prevContactList, contact]);
  };

  const removeContact = (contactId: number) => {
    setContactList((prevContactList) =>
      prevContactList.filter((contact) => contact.id !== contactId)
    );
  };

  return { contactList, addContact, getContact, removeContact };
};

export default useContactList;
