import { useContext } from 'react';
import { Meetup } from '../models';
import { supabase } from '../singletons';
import { AuthContext } from '../contexts/AuthContext';

const useMeetup = () => {
  const { appUser } = useContext(AuthContext);

  const getMeetup = async (meetupId: number): Promise<Meetup | null> => {
    const { data } = await supabase.from('meetup').select(
      'meetup_id, details, location, meet_date'
    ).eq('meetup_id', meetupId).limit(1).single();
    return data as Meetup;
  }

  const addMeetup = async (contactId: number, meetup: Meetup): Promise<void> => {
    await supabase.from('meetup').insert({ ...meetup, contact_id: contactId });
  };
  
  const updateMeetup = async (meetupId: number, meetup: Meetup): Promise<Meetup | null> => {
    if (!appUser || !appUser.user_id) return null;
    const { data } = await supabase.from('meetup').update(meetup).eq('meetup_id', meetupId).select().single();
    return data as Meetup;
  };

  const removeMeetup = (meetupId: number) => {
  };

  return { getMeetup, addMeetup, updateMeetup, removeMeetup };
};

export default useMeetup;
