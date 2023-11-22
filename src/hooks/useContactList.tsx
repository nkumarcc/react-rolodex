import { useState, useEffect, useContext } from 'react';
import { Contact, Meetup } from '../models';
import { supabase } from '../singletons';
import { AuthContext } from '../contexts/AuthContext';

const useContactList = () => {
  const { appUser } = useContext(AuthContext);
  const [contactList, setContactList] = useState<Contact[]>([]);

  useEffect(() => {
    if (!appUser || !appUser.user_id) {
      return;
    }
    supabase.from('contact').select(
      'contact_id, folder, name, notes, relationship, title, meetup (details, location, meet_date)'
    ).eq('user_id', appUser.user_id).then(
      ({data, error}) => setContactList(data as Contact[])
    );
  }, [appUser]);


  const getContact = (contactId: number) => {
    return contactList.find((contact) => contact.contact_id === contactId);
  }

  const addContact = (contact: Contact, meetup: Meetup) => {
    if (!appUser || !appUser.user_id) {
      return;
    }
    supabase.from('contact').insert({ ...contact, user_id: appUser.user_id }).select().then(
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
