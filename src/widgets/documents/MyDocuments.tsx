"use client";
import { useContext } from 'react';
import { AuthContext } from '@/entities/user';
import { DocumentsList, useGetMyDocuments } from '@/entities/document';

export const MyDocuments = () => {
  const {user} = useContext(AuthContext)
  if (!user) return;
  const {data} = useGetMyDocuments(user.user_id);
  if (!data) return;
  return <div>
    <DocumentsList documents={data} />
  </div>
}