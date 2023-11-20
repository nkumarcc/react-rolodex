import React, { FC, useState } from 'react';
import { Button } from '@mantine/core';
import { ListWrapper } from './List.styled';
import useContactList from '../../hooks/useContactList';
import { useNavigate } from 'react-router-dom';

interface ListProps {}

const List: FC<ListProps> = () => {

   const { contactList } = useContactList();
   const navigate = useNavigate();

   return (
      <ListWrapper>
         <h1>Contact List</h1>
         <ul>
            {contactList.map((item, index) => ( <li key={index}>{item.name}</li> ))}
         </ul>
         <Button onClick={() => navigate('/add')}>Add New Contact</Button>
      </ListWrapper>
   );
   
}

export default List;
