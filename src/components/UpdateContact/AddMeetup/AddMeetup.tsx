import React, { FC, useContext } from 'react';
import { AddMeetupWrapper } from './AddMeetup.styled';
import { Button, Space, Stack, TextInput, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { TransformedValues, useForm } from '@mantine/form';
import useContactList from '../../../hooks/useContactList';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';

interface AddMeetupProps {}

const AddMeetup: FC<AddMeetupProps> = () => {
   const { appUser } = useContext(AuthContext);
   const { addContact } = useContactList();
   const navigate = useNavigate();

   const form = useForm({
      initialValues: {
         name: '',
         relationship: '',
         title: '',
         notes: '',
         meetupLocation: '',
         meetup: '',
         meetupDate: '',
      },
   });

   const handleSubmit = (values: TransformedValues<typeof form>) => {
      if (!appUser || !appUser.user_id) return;
      addContact({
         user_id: appUser.user_id,
         name: values.name,
         title: values.title,
         relationship: values.relationship,
         notes: values.notes,
      }, {
         location: values.meetupLocation,
         details: values.meetup,
         meet_date: values.meetupDate,
      });
   };
           


   return (
      <AddMeetupWrapper>
         <Stack>
            <h1>Add Meetup</h1>
            <form onSubmit={form.onSubmit(handleSubmit)}>
               <TextInput label="Meetup Location:" placeholder="Meetup locations" {...form.getInputProps('meetupLocation')} />
               <DateInput label="Meetup Date:" placeholder="Meetup date" {...form.getInputProps('meetupDate')} />
               <Textarea label="Meetup Details:" placeholder="Meetup details" {...form.getInputProps('meetup')} />
               <Space h="md"></Space>
               <Button variant='light' fullWidth type="submit">Add Meetup</Button>
            </form>
            <Button onClick={() => navigate('/')}>Return to {}</Button>
         </Stack>
      </AddMeetupWrapper>
   );
}

export default AddMeetup;
