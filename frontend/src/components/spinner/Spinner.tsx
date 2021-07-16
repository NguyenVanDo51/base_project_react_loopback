import React from 'react';
import { Spinner as Spin } from 'react-bootstrap';

type LoadingType = {
  loading: boolean;
}

const Loading: React.FC<LoadingType> = ({ loading = false, children }) => {
  if (loading) {
    return <Spin animation="border" variant="primary" />;
  }

  return <>{children}</>;
};

export default Loading;
