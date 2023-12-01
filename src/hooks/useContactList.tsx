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
      'contact_id, folder, name, notes, relationship, title, meetup (meetup_id, details, location, meet_date)'
    ).eq('user_id', appUser.user_id).then(
      ({data, error}) => setContactList(data as Contact[])
    );
  }, [appUser]);


  const addMeetup = (contactId: number, meetup: Meetup) => {
    if (!appUser || !appUser.user_id) {
      return;
    }
    supabase.from('meetup').insert({ ...meetup, contact_id: contactId })
      .select().then(() => {
        setContactList((prevContactList: Contact[]) => {
          const contactToUpdate = prevContactList.find(contact => contact.contact_id === contactId);
          if (!contactToUpdate || !contactToUpdate.meetup) return prevContactList;
          contactToUpdate.meetup.push(meetup);
          return prevContactList;
        });
      });
  };

  
  const updateMeetup = (meetupId: number, contactId: number, meetup: Meetup) => {
    if (!appUser || !appUser.user_id) {
      return;
    }
    supabase.from('meetup').update(meetup)
      .match({ contact_id: contactId, meetup_id: meetupId })
      .select().then(() => {
        setContactList((prevContactList: Contact[]) => {
          const contactToUpdate = prevContactList.find(contact => contact.contact_id === contactId);
          if (!contactToUpdate || !contactToUpdate.meetup) return prevContactList;
          contactToUpdate.meetup[contactToUpdate.meetup.findIndex(meetup => meetup.meetup_id === meetupId)] = meetup;
          return prevContactList;
        });
      });
  };

  return { contactList, addMeetup, updateMeetup };
};

export default useContactList;
