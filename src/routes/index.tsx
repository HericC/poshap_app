import React, { useContext } from 'react';

import AppRoutes from './app';
import AuthRoutes from './auth';

import { AuthContext } from '../contexts/AuthContext';

export default function Routes() {
  const { authenticated } = useContext(AuthContext);

  return authenticated ? <AppRoutes /> : <AuthRoutes />;
}
