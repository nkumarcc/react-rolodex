import { useState, useEffect, useContext } from 'react';
import { Contact, Meetup } from '../models';
import { supabase } from '../singletons';
import { AuthContext } from '../contexts/AuthContext';

const useContact = () => {
  const { appUser } = useContext(AuthContext);
  const [contactList, setContactList] = useState<Contact[]>([]);

  useEffect(() => {
    if (!appUser || !appUser.user_id) {
      return;
    }
    supabase.from('contact').select(
      'contact_id, folder, name, notes, relationship, title, meetup (meetup_id, details, location, meet_date)'
    ).eq('user_id', appUser.user_id).then(
      ({data, error}) => setContactList(data as Contact[])
    );
  }, [appUser]);


  const getContact = async (contactId: number): Promise<Contact | null> => {
    if (!appUser || !appUser.user_id) return null;
    const { data } = await supabase.from('contact').select(
      'contact_id, folder, name, notes, relationship, title, meetup (meetup_id, details, location, meet_date)'
    ).eq('contact_id', contactId).limit(1).single();
    return data as Contact;
  }

  const addContact = async (contact: Contact, meetup: Meetup): Promise<void> => {
    if (!appUser || !appUser.user_id) return;
    const { data: insertedContact } = await supabase.from('contact').insert({ ...contact, user_id: appUser.user_id }).select().single();
    if (!insertedContact) return;
    await supabase.from('meetup').insert({ ...meetup, contact_id: insertedContact?.contact_id });
  };
  
  const updateContact = async (contactId: number, contact: Contact): Promise<Contact | null> => {
    if (!appUser || !appUser.user_id) return null;
    const { data } = await supabase.from('contact').update(contact).eq('contact_id', contactId).select().single();
    return data as Contact;
  };

  const removeContact = (contactId: number) => {
    setContactList((prevContactList) =>
      prevContactList.filter((contact) => contact.contact_id !== contactId)
    );
  };

  return { contactList, addContact, updateContact, getContact, removeContact };
};

export default useContact;
