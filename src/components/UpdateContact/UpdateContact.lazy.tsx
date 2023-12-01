import React, { lazy, Suspense } from 'react';

const LazyUpdateContact = lazy(() => import('./UpdateContact'));

const UpdateContact = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyUpdateContact {...props} />
  </Suspense>
);

export default UpdateContact;
