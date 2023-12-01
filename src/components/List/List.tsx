import React, { FC, useState } from 'react';
import { Button, Stack } from '@mantine/core';
import { ListWrapper } from './List.styled';
import useContactList from '../../hooks/useContactList';
import { useNavigate } from 'react-router-dom';
import ContactCard from './ContactCard/ContactCard';

interface ListProps {}

const List: FC<ListProps> = () => {

   const { contactList } = useContactList();
   const navigate = useNavigate();

   return (
      <ListWrapper>
         <Stack>
            <h1>Contact List</h1>
            {contactList.map(
               (contact, index) =>
                  (<ContactCard key={index} contact={contact} clickContact={() => navigate(`/update/${contact.contact_id}`)}></ContactCard>)
            )}
            <Button onClick={() => navigate('/add')}>Add New Contact</Button>
         </Stack>
      </ListWrapper>
   );
   
}

export default List;
