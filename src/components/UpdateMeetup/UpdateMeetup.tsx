import React, { FC, useContext, useEffect, useState } from 'react';
import { UpdateMeetupWrapper } from './UpdateMeetup.styled';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { Contact, Meetup } from '../../models';
import useContactList from '../../hooks/useContactList';
import { TransformedValues, useForm } from '@mantine/form';
import { Button, Space, Stack, TextInput, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import useContact from '../../hooks/useContact';

interface UpdateMeetupProps {}

const UpdateMeetup: FC<UpdateMeetupProps> = () => {

   const { contactId, meetupId } = useParams();
   const { appUser } = useContext(AuthContext);
   const { contactList, updateMeetup } = useContactList();
   const { getContact } = useContact();
   const [contact, setContact] = useState<Contact | null>(null);
   const [meetup, setMeetup] = useState<Meetup | null>(null);
   const navigate = useNavigate();

   const form = useForm({
      initialValues: {
         meet_date: new Date(),
         location: '',
         details: '',
      },
   });

   useEffect(() => {
      if (!contactId || !meetupId) return navigate('/');
      getContact(parseInt(contactId)).then(contact => {
         setContact(contact);
         setMeetup(contact?.meetup?.find((meetup) => meetup.meetup_id === parseInt(meetupId)) || null);
      });
   }, [contactList]);

   useEffect(() => {
      if (!meetup || !form) return;
      form.setValues({
         meet_date: new Date(meetup.meet_date),
         location: meetup.location || '',
         details: meetup.details || '',
      });
   }, [meetup]);

   const handleSubmit = (values: TransformedValues<typeof form>) => {
      if (!contactId || !meetupId || !appUser || !appUser.user_id) return;
      updateMeetup(parseInt(meetupId), parseInt(contactId), {
         meet_date: values.meet_date.toDateString(),
         location: values.location,
         details: values.details,
      });
   };
           

   return (
      <UpdateMeetupWrapper>
         <Stack>
            <h1>{contact?.name}</h1>
            <h2>{meetup?.meet_date}</h2>
            <form onSubmit={form.onSubmit(handleSubmit)}>
               <DateInput label="Meetup Date:" placeholder="Meetup date" {...form.getInputProps('meet_date')} />
               <TextInput label="Location:" placeholder="Location" {...form.getInputProps('location')} />
               <Textarea label="Details:" placeholder="Details" {...form.getInputProps('details')} />
               <Space h="md"></Space>
               <Button variant='light' fullWidth type="submit">Update Meetup</Button>
            </form>
            <Button onClick={() => navigate(`/update/${contactId}`)}>Return to Contact</Button>
         </Stack>
      </UpdateMeetupWrapper>
   );
}

export default UpdateMeetup;
