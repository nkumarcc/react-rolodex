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

  return { contactList };
};

export default useContactList;
