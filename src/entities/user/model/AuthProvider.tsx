'use client';
import { useCheckAuth, User } from './';
import { usePathname } from 'next/navigation';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';

interface IAuthContext {
  user: User | undefined;
  logout: () => void;
  refetch: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  user: undefined,
  logout: () => {},
  refetch: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const isAuth = pathname.startsWith('/auth');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('tz-token');
      setToken(storedToken);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('tz-token');
    location.reload();
  };

  const { userData, refetch, isLoading } = useCheckAuth(!isAuth, String(token));

  return (
    <AuthContext.Provider value={{ user: userData, logout, refetch }}>
      {children}
    </AuthContext.Provider>
  );
};
