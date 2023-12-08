import React, { lazy, Suspense } from 'react';

const LazyUpdateMeetup = lazy(() => import('./UpdateMeetup'));

const UpdateMeetup = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyUpdateMeetup {...props} />
  </Suspense>
);

export default UpdateMeetup;
