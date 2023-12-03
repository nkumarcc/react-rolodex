import { useContext } from 'react';
import { Contact } from '../models';
import { supabase } from '../singletons';
import { AuthContext } from '../contexts/AuthContext';

const useContactList = () => {
  const { appUser } = useContext(AuthContext);

  const getContactList = async (): Promise<Contact[] | null> => {
    if (!appUser || !appUser.user_id) return null;
    const { data } = await supabase.from('contact').select(
      'contact_id, folder, name, notes, relationship, title, meetup (meetup_id, details, location, meet_date)'
    ).eq('user_id', appUser.user_id);
    return data as Contact[];
  }

  return { getContactList };
};

export default useContactList;
