import React, { FC } from 'react';
import { LoginWrapper } from './Login.styled';
import useAuth from '../../hooks/useAuth';
import { TransformedValues, useForm } from '@mantine/form';
import { Button, Space, Stack, TextInput } from '@mantine/core';

interface LoginProps {}

const Login: FC<LoginProps> = () => {

   const { login } = useAuth();

   const form = useForm({
      initialValues: {
         email: '',
         password: '',
      },
   });

   const handleSubmit = (values: TransformedValues<typeof form>) => {
      login(values.email, values.password);
   };
           

   return (
      <LoginWrapper>
         <Stack>
            <h1>Login</h1>
            <form onSubmit={form.onSubmit(handleSubmit)}>
               <TextInput label="Email:" placeholder="Email" {...form.getInputProps('email')} />
               <TextInput label="Password:" placeholder="Password" {...form.getInputProps('password')} />
               <Space h="md"></Space>
               <Button fullWidth type="submit">Log In</Button>
            </form>
         </Stack>
      </LoginWrapper>
   );
}

export default Login;
