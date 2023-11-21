import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../database.types';
import { Contact, Meetup } from '../models';

const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_API_URL as string,
  process.env.REACT_APP_SUPABASE_API_KEY as string,
);

const useContactList = () => {
  const [contactList, setContactList] = useState<Contact[]>([]);

  useEffect(() => {
    // Save contact list to local storage whenever it changes
    supabase.from('contact').select(
      'contact_id, folder, name, notes, relationship, title, meetup (details, location, meet_date)'
    ).eq('user_id', 1).then(({data, error}) => setContactList(data as Contact[]));
  }, []);


  const getContact = (contactId: number) => {
    return contactList.find((contact) => contact.contact_id === contactId);
  }

  const addContact = (contact: Contact, meetup: Meetup) => {
    supabase.from('contact').insert({ ...contact, user_id: 1 }).select().then(
      (insertedContact) => insertedContact?.data && supabase.from('meetup').insert({ ...meetup, contact_id: insertedContact.data[0].contact_id })
    ).then(() => {
      contact.meetup = [meetup];
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
