import React, { FC } from 'react';
import { Box, Button, TextInput } from '@mantine/core';
import { TransformedValues, useForm } from '@mantine/form';
import { AddContactWrapper } from './AddContact.styled';
import useContactList from '../../hooks/useContactList';
import { useNavigate } from 'react-router-dom';

interface AddContactProps {}

const AddContact: FC<AddContactProps> = () => {

   const { addContact } = useContactList();
   const navigate = useNavigate();

   const form = useForm({
      initialValues: { name: '' },
   });

   const handleSubmit = (values: TransformedValues<typeof form>) => {
      addContact({ user_id: 1, name: values.name, relationship: 'friend' });
   };

   return (
      <AddContactWrapper>
         <Box maw={340} mx="auto">
            <form onSubmit={form.onSubmit(handleSubmit)}>
               <TextInput label="Name:" placeholder="Name" {...form.getInputProps('name')} />
               <Button type="submit">Add Contact</Button>
            </form>
            <Button onClick={() => navigate('/')}>Return to List</Button>
         </Box>
      </AddContactWrapper>
   );
}

export default AddContact;
