import React, { FC, useContext, useEffect, useState } from 'react';
import { UpdateContactWrapper } from './UpdateContact.styled';
import { Button, Space, Stack, TextInput, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { TransformedValues, useForm } from '@mantine/form';
import useContactList from '../../hooks/useContactList';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { Contact } from '../../models';

interface UpdateContactProps {}

const UpdateContact: FC<UpdateContactProps> = () => {

   const { contactId } = useParams();
   const { appUser } = useContext(AuthContext);
   const { contactList, getContact, updateContact } = useContactList();
   const [contact, setContact] = useState<Contact | null>(null);
   const navigate = useNavigate();

   const form = useForm({
      initialValues: {
         name: '',
         relationship: '',
         title: '',
         notes: '',
      },
   });

   useEffect(() => {
      if (!contactId) return navigate('/');
      setContact(getContact(parseInt(contactId)));
   }, [contactList]);

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
      });
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
               <Button onClick={() => navigate('/')}>Return to List</Button>
            </Stack>
      </UpdateContactWrapper>
   );

}
export default UpdateContact;
