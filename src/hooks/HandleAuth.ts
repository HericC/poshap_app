import { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { LoadingContext } from '../contexts/LoadingContext';
import { LoginDto } from '../pages/Login/dto';
import { checkTokenExpired, decodeToken } from '../utils/Functions';

interface authUserDto {
  access_token: string;
}

interface UserDto {
  id: string;
  email: string;
  access_token: string;
}

export const authUserDefault: UserDto | null = null;

function HandleAuth() {
  const { handleLoading } = useContext(LoadingContext);

  const [authLoading, setAuthLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [authUser, setAuthUser] = useState(authUserDefault);

  useEffect(() => {
    authPersistence();
    if (!authUser) return;

    const tokenExpired = checkTokenExpired(authUser.access_token);
    if (tokenExpired) handleLogout();
  });

  const authPersistence = async () => {
    const cdcAuthPshp = await AsyncStorage.getItem('cdcAuthPshp');

    if (cdcAuthPshp) {
      const authUser: UserDto = JSON.parse(cdcAuthPshp);

      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${authUser.access_token}`;

      setAuthenticated(true);
      setAuthUser(authUser);
    }

    setAuthLoading(true);
  };

  const handleLogin = async (loginDto: LoginDto) => {
    try {
      handleLoading(true);

      const { data }: { data: authUserDto } = await api.post(
        'auth/login',
        loginDto,
      );

      const tokenDecode = decodeToken(data.access_token);

      const user: UserDto = {
        id: tokenDecode.sub,
        email: tokenDecode.email,
        access_token: data.access_token,
      };

      await AsyncStorage.setItem('cdcAuthPshp', JSON.stringify(user));

      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.access_token}`;

      setAuthenticated(true);
      setAuthUser(user);
    } catch (error) {
      console.warn(error);
    } finally {
      handleLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('cdcAuthPshp');
    api.defaults.headers.common['Authorization'] = '';
    setAuthenticated(false);
    setAuthUser(null);
  };

  return { authenticated, authUser, handleLogin, handleLogout, authLoading };
}

export default HandleAuth;
