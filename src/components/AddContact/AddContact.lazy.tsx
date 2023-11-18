import React, { lazy, Suspense } from 'react';

const LazyAddContact = lazy(() => import('./AddContact'));

const AddContact = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAddContact {...props} />
  </Suspense>
);

export default AddContact;
