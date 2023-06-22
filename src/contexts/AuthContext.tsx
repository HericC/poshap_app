import React, { createContext } from 'react';
import HandleAuth, { authUserDefault } from '../hooks/HandleAuth';
import { LoginDto } from '../pages/Login/dto';

const AuthContext = createContext({
  authenticated: false,
  authUser: authUserDefault,
  handleLogin: async (payload: LoginDto) => {
    return;
  },
  handleLogout: async () => {
    return;
  },
});

function AuthProvider({ children }: any) {
  const { authLoading, authenticated, authUser, handleLogin, handleLogout } =
    HandleAuth();

  if (authLoading) return <></>;

  return (
    <AuthContext.Provider
      value={{ authenticated, authUser, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
