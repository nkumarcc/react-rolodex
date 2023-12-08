import React, { FC } from 'react';
import { ContactCardWrapper } from './ContactCard.styled';
import { Contact } from '../../../models';
import { Box, Card, Group, Text } from '@mantine/core';

interface ContactCardProps {
   contact: Contact;
   clickContact: () => void;
}

const ContactCard: FC<ContactCardProps> = ({ contact, clickContact }) => (
 <ContactCardWrapper>
   <Card
      shadow="sm"
      padding="sm"
      radius="md"
      style={{ margin: 'auto' }}
      onClick={clickContact}
   >
      <Text> {contact.name} </Text>
      {
         contact.meetup?.length ? (
            <Text size="xs">
               <b>Last Meetup Date:</b> {contact.meetup[contact.meetup.length - 1].meet_date}
            </Text>
         ) : <></>
      }
      <Text size="xs">
         <b>Relationship:</b> {contact.relationship}
      </Text>
      {
         contact.notes && (
            <Text size="xs">
               <b>Details:</b> {contact.notes}
            </Text>
         )
      }
   </Card>
 </ContactCardWrapper>
);

export default ContactCard;
