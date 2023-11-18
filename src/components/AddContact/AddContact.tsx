import React, { FC } from 'react';
import { AddContactWrapper } from './AddContact.styled';
import useContactList from '../../hooks/useContactList';
import { useFormik } from 'formik';

interface AddContactProps {}

const AddContact: FC<AddContactProps> = () => {

   const { addContact } = useContactList();

   const formik = useFormik({
      initialValues: {
        name: '',
      },
      onSubmit: values => {
        addContact({ id: 1, name: values.name });
      },
    });

   return (
      <AddContactWrapper>
         <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">
               Name:
            </label>
            <input
               id="name"
               name="name"
               type="text"
               onChange={formik.handleChange}
               value={formik.values.name}
            /> 
            <button type="submit">Add Contact</button>
         </form>
      </AddContactWrapper>
   );
}

export default AddContact;
