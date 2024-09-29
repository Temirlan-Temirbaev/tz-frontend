import { HTMLAttributes, PropsWithChildren, useEffect } from 'react';
import { gsap } from 'gsap';

type UIPopupProps = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  isContentInCenter?: boolean;
} & PropsWithChildren &
  HTMLAttributes<HTMLDivElement>;

export const UIPopup = ({
                          isOpen,
                          setIsOpen,
                          children,
                          isContentInCenter = true,
                          ...props
                        }: UIPopupProps) => {
  useEffect(() => {
    gsap.to('.modal', {
      ease: 'ease',
      duration: 0.2,
      display: isOpen ? 'flex' : 'none',
    });
  }, [isOpen]);

  return (
    <div
      {...props}
      className={`absolute top-0 left-0 z-[2] w-full h-screen bg-black bg-opacity-70 modal ${
        isContentInCenter && 'justify-center items-center'
      } ${props.className}`}
      onClick={() => {
        setIsOpen(!isOpen);
      }}>
      {children}
    </div>
  );
};
