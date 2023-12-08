import React, { FC } from 'react';
import { ContactCardWrapper } from './ContactCard.styled';
import { Contact } from '../../../models';
import { rem, Card, Text, Grid, Button } from '@mantine/core';
import { IconX } from '@tabler/icons-react';


interface ContactCardProps {
   contact: Contact;
   clickContact: () => void;
   removeContact: (contactId: number | undefined) => void;
}

const ContactCard: FC<ContactCardProps> = ({ contact, clickContact, removeContact }) => (
 <ContactCardWrapper>
   <Card
      shadow="sm"
      padding="sm"
      radius="md"
      style={{ margin: 'auto' }}
   >
      <Grid>
         <Grid.Col span={10} onClick={clickContact}>
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
         </Grid.Col>
         <Grid.Col span={2} style={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            paddingInlineEnd: '10px'
         }}>
            <Button variant="subtle" style={{ padding: 0 }}  onClick={() => removeContact(contact?.contact_id)}>
               <IconX
                  style={{ width: rem(20), height: rem(20) }}
                  stroke={2.5}
               />
            </Button>
         </Grid.Col>
      </Grid>
   </Card>
 </ContactCardWrapper>
);

export default ContactCard;
