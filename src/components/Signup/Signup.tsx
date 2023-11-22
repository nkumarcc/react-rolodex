import React, { FC } from 'react';
import { Anchor, Button, PasswordInput, Space, Stack, Text, TextInput } from '@mantine/core';
import { TransformedValues, useForm } from '@mantine/form';
import { SignupWrapper } from './Signup.styled';
import useAuth from '../../hooks/useAuth';

interface SignupProps {}

const Signup: FC<SignupProps> = () => {
   const { signup } = useAuth();

   const form = useForm({
      initialValues: {
         firstName: '',
         lastName: '',
         email: '',
         password: '',
         passwordConfirmation: '',
      },
   });

   const handleSubmit = (values: TransformedValues<typeof form>) => {
      signup(values.email, values.password, values.firstName, values.lastName);
   };
           

   return (
      <SignupWrapper>
         <Stack>
            <h1>Signup</h1>
            <form onSubmit={form.onSubmit(handleSubmit)}>
               <TextInput label="First Name:" placeholder="First Name" {...form.getInputProps('firstName')} />
               <TextInput label="Last Name:" placeholder="Last Name" {...form.getInputProps('lastName')} />
               <TextInput label="Email:" placeholder="Email" {...form.getInputProps('email')} />
               <PasswordInput label="Password:" placeholder="Password" {...form.getInputProps('password')} />
               <PasswordInput label="Confirm Password:" placeholder="Confirm Password" {...form.getInputProps('passwordConfirmation')} />
               <Space h="md"></Space>
               <Button fullWidth type="submit">Sign Up</Button>
            </form>
            <Text ta="center" size="sm">Already have an account? <Anchor href="/login">Log In</Anchor></Text>
         </Stack>
      </SignupWrapper>
   );
};

export default Signup;
