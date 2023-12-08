import React, { lazy, Suspense } from 'react';

const LazyAddMeetup = lazy(() => import('./AddMeetup'));

const AddMeetup = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAddMeetup {...props} />
  </Suspense>
);

export default AddMeetup;
