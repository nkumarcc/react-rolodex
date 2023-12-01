import React, { FC } from 'react';
import { MeetupListWrapper } from './MeetupList.styled';
import { Meetup } from '../../models';
import MeetupCard from './MeetupCard/MeetupCard';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';

interface MeetupListProps {
   meetupList: Meetup[];
}

const MeetupList: FC<MeetupListProps> = ({ meetupList }) => {

   const navigate = useNavigate();

   return (
      <MeetupListWrapper>
         {meetupList.map(
            (meetup, index) =>
               (<MeetupCard key={index} meetup={meetup} clickMeetup={() => navigate(`/update/${meetup.meetup_id}`)}></MeetupCard>)
         )}
         <Button onClick={() => navigate('/add-meetup')}>Add New Meetup</Button>
      </MeetupListWrapper>
   );
}

export default MeetupList;
