import React, { FC } from 'react';
import { Box, Button, Space, Stack, TextInput, Textarea } from '@mantine/core';
import { TransformedValues, useForm } from '@mantine/form';
import { AddContactWrapper } from './AddContact.styled';
import useContactList from '../../hooks/useContactList';
import { useNavigate } from 'react-router-dom';

interface AddContactProps {}

const AddContact: FC<AddContactProps> = () => {

   const { addContact } = useContactList();
   const navigate = useNavigate();

   const form = useForm({
      initialValues: { name: '', relationship: '', notes: '' },
   });

   const handleSubmit = (values: TransformedValues<typeof form>) => {
      addContact({
         user_id: 1,
         name: values.name,
         relationship: values.relationship,
         notes: values.notes,
      });
   };

   return (
      <AddContactWrapper>
         <Stack>
            <h1>Add Contact</h1>
            <form onSubmit={form.onSubmit(handleSubmit)}>
               <TextInput label="Name:" placeholder="Name" {...form.getInputProps('name')} />
               <TextInput label="Relationship:" placeholder="Relationship" {...form.getInputProps('relationship')} />
               <Textarea label="Details:" placeholder="Details" {...form.getInputProps('notes')} />
               <Space h="md"></Space>
               <Button fullWidth type="submit">Add Contact</Button>
            </form>
            <Button onClick={() => navigate('/')}>Return to List</Button>
         </Stack>
      </AddContactWrapper>
   );
}

export default AddContact;
