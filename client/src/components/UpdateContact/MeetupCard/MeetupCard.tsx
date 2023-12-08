import React, { FC } from 'react';
import { MeetupCardWrapper } from './MeetupCard.styled';
import { Meetup } from '../../../models';
import { Box, Card, Group, Text } from '@mantine/core';

interface MeetupCardProps {
   meetup: Meetup;
   clickMeetup: () => void;
}

const MeetupCard: FC<MeetupCardProps> = ({ meetup, clickMeetup }) => (
 <MeetupCardWrapper>
   <Card
      shadow="sm"
      padding="sm"
      radius="md"
      style={{ margin: 'auto' }}
      onClick={clickMeetup}
   >
      <Text> {meetup.location} </Text>
      <Text> {meetup.meet_date} </Text>
      <Text size="xs">{meetup.details}</Text>
   </Card>
 </MeetupCardWrapper>
);

export default MeetupCard;
