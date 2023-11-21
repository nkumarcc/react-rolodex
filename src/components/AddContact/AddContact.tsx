import React, { FC } from 'react';
import { Button, Space, Stack, TextInput, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { TransformedValues, useForm } from '@mantine/form';
import { AddContactWrapper } from './AddContact.styled';
import useContactList from '../../hooks/useContactList';
import { useNavigate } from 'react-router-dom';

interface AddContactProps {}

const AddContact: FC<AddContactProps> = () => {

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
      addContact({
         user_id: 1,
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
      <AddContactWrapper>
         <Stack>
            <h1>Add Contact</h1>
            <form onSubmit={form.onSubmit(handleSubmit)}>
               <TextInput label="Name:" placeholder="Name" {...form.getInputProps('name')} />
               <TextInput label="Title:" placeholder="Title" {...form.getInputProps('title')} />
               <TextInput label="Relationship:" placeholder="Relationship" {...form.getInputProps('relationship')} />
               <Textarea label="Details:" placeholder="Details" {...form.getInputProps('notes')} />
               <TextInput label="First Meetup Location:" placeholder="Meetup locations" {...form.getInputProps('meetupLocation')} />
               <DateInput label="First Meetup Date:" placeholder="Meetup date" {...form.getInputProps('meetupDate')} />
               <Textarea label="First Meetup Details:" placeholder="Meetup details" {...form.getInputProps('meetup')} />
               <Space h="md"></Space>
               <Button fullWidth type="submit">Add Contact</Button>
            </form>
            <Button onClick={() => navigate('/')}>Return to List</Button>
         </Stack>
      </AddContactWrapper>
   );
}

export default AddContact;
