'use client';
import { Document, useDenieDocument } from '../';
import { DOCTYPE_IMAGES, STATUS_COLORS, STATUS_NAMES } from '@/enums';
import Link from 'next/link';
import Image from 'next/image';
import { extname } from 'path';
import { useContext } from 'react';
import { AuthContext } from '@/entities/user';
import { PopupContext } from '@/shared/providers';

export const DocumentCard = ({ document }: { document: Document }) => {
  const { user } = useContext(AuthContext);
  const {mutate} = useDenieDocument(document.document_id);
  const {setSignVisible, setSignId} = useContext(PopupContext)
  if (!user) return;
  return <div
    className={'hover:border-primary hover:-translate-y-1.5 delay-75 transition-all ease-linear w-[30%] rounded-xl border-2 border-black border-opacity-20 p-5 flex flex-col gap-y-2.5'}>
    <div>
      <div className={'flex justify-between items-center'}>
        <h1 className={'text-primary font-bold text-2xl'}>
          {document.document_name.length > 12
            ? `${document.document_name.slice(0, 12)}...${extname(document.document_name)}`
            : document.document_name}
        </h1>
        <Image src={`/${String(DOCTYPE_IMAGES[extname(document.document_url)])}`} alt={''} width={32} height={32} />
      </div>

      <h1 className={'text-black text-opacity-25 font-light text-sm'}>{document.created_at}</h1>
    </div>
    <p>Статус:{' '}
      <span className={``} style={{ color: STATUS_COLORS[document.status] }}>{STATUS_NAMES[document.status]}</span>
    </p>
    <Link
      className={'text-black text-opacity-25 underline'}
      href={`${process.env.basket_url}${document.document_url}`}>Просмотреть документ</Link>
    {user.role === 'admin' && document.status === "pending" && (
      <div>
        <p
          onClick={() => {
            setSignId(document.document_id);
            setSignVisible(true);
          }}
          className={'text-black text-opacity-25 underline cursor-pointer'}
        >Подписать документ</p>
        <p
          onClick={() => mutate()}
          className={'text-black text-opacity-25 underline cursor-pointer'}
        >Отклонить документ</p>
      </div>
    )}
  </div>;
};