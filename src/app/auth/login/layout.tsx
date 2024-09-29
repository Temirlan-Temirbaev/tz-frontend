import { PropsWithChildren } from 'react';

export default function LoginLayout({ children }: PropsWithChildren) {
  return <div className={'w-full h-screen flex justify-center items-center'}>
    {children}
  </div>;
}