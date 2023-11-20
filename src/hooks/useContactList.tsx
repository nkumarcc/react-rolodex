import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../database.types';
import { Contact } from '../models';

const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_API_URL as string,
  process.env.REACT_APP_SUPABASE_API_KEY as string,
);

const useContactList = () => {
  const [contactList, setContactList] = useState<Contact[]>([]);

  useEffect(() => {
    // Save contact list to local storage whenever it changes
    supabase.from('contact').select().eq('user_id', 1).then(({data, error}) => {
      setContactList(data as Contact[]);
    });
  }, []);


  const getContact = (contactId: number) => {
    return contactList.find((contact) => contact.contact_id === contactId);
  }

  const addContact = (contact: Contact) => {
    supabase.from('contact').insert({ ...contact, user_id: 1 }).then(() => {
      setContactList((prevContactList: Contact[]) => [...prevContactList, contact]);
    });
  };

  const removeContact = (contactId: number) => {
    setContactList((prevContactList) =>
      prevContactList.filter((contact) => contact.contact_id !== contactId)
    );
  };

  return { contactList, addContact, getContact, removeContact };
};

export default useContactList;
