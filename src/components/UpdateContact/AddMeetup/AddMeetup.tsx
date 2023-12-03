import React, { FC, useContext, useEffect, useState } from 'react';
import { AddMeetupWrapper } from './AddMeetup.styled';
import { Button, Space, Stack, TextInput, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { TransformedValues, useForm } from '@mantine/form';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { Contact } from '../../../models';
import useContact from '../../../hooks/useContact';
import useMeetup from '../../../hooks/useMeetup';

interface AddMeetupProps {}

const AddMeetup: FC<AddMeetupProps> = () => {

   const { contactId } = useParams();
   const { appUser } = useContext(AuthContext);
   const { getContact } = useContact();
   const { addMeetup } = useMeetup();
   const [contact, setContact] = useState<Contact | null>(null);
   const navigate = useNavigate();

   const form = useForm({
      initialValues: {
         meet_date: '',
         location: '',
         details: '',
      },
   });

   useEffect(() => {
      if (!contactId) return navigate('/');
      getContact(parseInt(contactId)).then(contact => setContact(contact));
   }, []);

   const handleSubmit = (values: TransformedValues<typeof form>) => {
      if (!contactId || !appUser || !appUser.user_id) return;
      console.log('here');
      addMeetup(parseInt(contactId), {
         meet_date: values.meet_date,
         location: values.location,
         details: values.details,
      }).then(console.log);
   };

   return (
      <AddMeetupWrapper>
         <Stack>
            <h1>Add Meetup for {contact?.name}</h1>
            <form onSubmit={form.onSubmit(handleSubmit)}>
               <TextInput label="Meetup Location:" placeholder="Meetup locations" {...form.getInputProps('location')} />
               <DateInput label="Meetup Date:" placeholder="Meetup date" {...form.getInputProps('meet_date')} />
               <Textarea label="Meetup Details:" placeholder="Meetup details" {...form.getInputProps('details')} />
               <Space h="md"></Space>
               <Button variant='light' fullWidth type="submit">Add Meetup</Button>
            </form>
            <Button onClick={() => navigate(`/update/${contact?.contact_id}`)}>Return to {contact?.name}</Button>
         </Stack>
      </AddMeetupWrapper>
   );
}

export default AddMeetup;
