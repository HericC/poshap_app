import jwt_decode from 'jwt-decode';

interface jwtDto {
  sub: string;
  email: string;
  name: string;
  planKey: string;
  planDate: string;
  exp: number;
  iat: number;
}

export function decodeToken(token: string): jwtDto {
  return jwt_decode(token);
}

export function checkTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  return Date.now() > decoded.exp * 1000;
}
