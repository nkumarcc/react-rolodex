import React, { FC, useContext, useEffect, useState } from 'react';
import { UpdateContactWrapper } from './UpdateContact.styled';
import { Button, Space, Stack, TextInput, Textarea } from '@mantine/core';
import { TransformedValues, useForm } from '@mantine/form';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { Contact } from '../../models';
import MeetupCard from './MeetupCard/MeetupCard';
import useContact from '../../hooks/useContact';

interface UpdateContactProps {}

const UpdateContact: FC<UpdateContactProps> = () => {

   const { contactId } = useParams();
   const { appUser } = useContext(AuthContext);
   const { getContact, updateContact } = useContact();
   const [contact, setContact] = useState<Contact | null>(null);
   const navigate = useNavigate();
   
   useEffect(() => {
      if (!contactId) return navigate('/');
      getContact(parseInt(contactId)).then(contact => setContact(contact));
   }, []);

   const form = useForm({
      initialValues: {
         name: '',
         relationship: '',
         title: '',
         notes: '',
      },
   });

   useEffect(() => {
      if (!contact || !form) return;
      form.setValues({
         name: contact.name,
         relationship: contact.relationship,
         title: contact.title || '',
         notes: contact.notes || '',
      });
   }, [contact]);

   const handleSubmit = (values: TransformedValues<typeof form>) => {
      if (!contactId || !appUser || !appUser.user_id) return;
      updateContact(parseInt(contactId), {
         user_id: appUser.user_id,
         name: values.name,
         title: values.title,
         relationship: values.relationship,
         notes: values.notes,
      }).then(() => getContact(parseInt(contactId)))
      .then(updatedContact => setContact(updatedContact));
   };
           
   return (
      <UpdateContactWrapper>
            <Stack>
               <h1>{contact?.name}</h1>
               <form onSubmit={form.onSubmit(handleSubmit)}>
                  <TextInput label="Name:" placeholder="Name" {...form.getInputProps('name')} />
                  <TextInput label="Title:" placeholder="Title" {...form.getInputProps('title')} />
                  <TextInput label="Relationship:" placeholder="Relationship" {...form.getInputProps('relationship')} />
                  <Textarea label="Details:" placeholder="Details" {...form.getInputProps('notes')} />
                  <Space h="md"></Space>
                  <Button variant='light' fullWidth type="submit">Update Contact</Button>
               </form>
               <h2>Meetups</h2>
               {contact?.meetup?.map(
                  (meetup, index) =>
                     (<MeetupCard key={index} meetup={meetup} clickMeetup={() => navigate(`/update/${contactId}/${meetup.meetup_id}`)}></MeetupCard>)
               )}
               <Button variant='light' fullWidth onClick={() => navigate(`/update/${contactId}/add`)}>Add Meetup</Button>
               <Button onClick={() => navigate('/')}>Return to List</Button>
            </Stack>
      </UpdateContactWrapper>
   );

}
export default UpdateContact;
