"use client"
import { createContext, PropsWithChildren, useState } from 'react';

interface IPopupContext {
  signVisible: boolean;
  setSignVisible: (visible: boolean) => void;
  signId: number | null;
  setSignId: (id: number) => void;
  notificationsVisible: boolean;
  setNotificationsVisible: (visible: boolean) => void;
}

export const PopupContext = createContext<IPopupContext>({
  signId: null,
  setSignId: () => {
  },
  signVisible: false,
  setSignVisible: () => {
  },
  notificationsVisible: false,
  setNotificationsVisible: () => {
  },
});

export const PopupProvider = ({ children }: PropsWithChildren) => {
  const [signId, setSignId] = useState<number | null>(null);
  const [signVisible, setSignVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  return <PopupContext.Provider
    value={{ signId, setSignId, signVisible, setSignVisible, notificationsVisible, setNotificationsVisible }}>
    {children}
  </PopupContext.Provider>;
};
