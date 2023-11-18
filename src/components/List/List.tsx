import React, { FC, useState } from 'react';
import { ListWrapper } from './List.styled';
import useContactList from '../../hooks/useContactList';

interface ListProps {}

const List: FC<ListProps> = () => {

   const { contactList } = useContactList();

   return (
      <ListWrapper>
         <h1>Contact List</h1>
         <ul>
            {contactList.map((item, index) => ( <li key={index}>{item.name}</li> ))}
         </ul>
      </ListWrapper>
   );
   
}

export default List;
