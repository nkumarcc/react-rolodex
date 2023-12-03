import React, { FC, useEffect, useState } from 'react';
import { Button, Stack } from '@mantine/core';
import { ListWrapper } from './List.styled';
import useContactList from '../../hooks/useContactList';
import { useNavigate } from 'react-router-dom';
import ContactCard from './ContactCard/ContactCard';
import { Contact } from '../../models';

interface ListProps {}

const List: FC<ListProps> = () => {

   const { getContactList } = useContactList();
   const [contactList, setContactList] = useState<Contact[] | null>([]);
   const navigate = useNavigate();

   useEffect(() => {
      getContactList().then(contactList => setContactList(contactList || []));
   }, []);

   return (
      <ListWrapper>
         <Stack>
            <h1>Contact List</h1>
            {contactList?.map(
               (contact, index) =>
                  (<ContactCard key={index} contact={contact} clickContact={() => navigate(`/update/${contact.contact_id}`)}></ContactCard>)
            )}
            <Button onClick={() => navigate('/add')}>Add New Contact</Button>
         </Stack>
      </ListWrapper>
   );
   
}

export default List;
