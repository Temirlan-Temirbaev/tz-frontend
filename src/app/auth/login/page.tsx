'use client';

import React, { useState } from 'react';
import { useLogin } from '@/entities/user';
import { toast } from 'react-toastify';
import UIButton from '@/shared/ui/UI-Button';
import UIInput from '@/shared/ui/UI-Input';

const LoginForm = () => {
  const [p12File, setP12File] = useState<File | null>(null);
  const [password, setPassword] = useState<string >();
  const loginMutation = useLogin();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setP12File(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!p12File) {
      toast.error('Выберите файл ЭЦП ключа.', {position : "top-right"});
      return;
    }

    if (!password || password.length === 0) {
      toast.error('Введите пароль.', {position : "top-right"});
      return;
    }
    loginMutation.mutate({
      p12File, password
    });
  };

  return (
    <form onSubmit={handleSubmit} className={"flex flex-col w-full max-w-[350px] gap-y-5"}>
      <div>
        <label htmlFor="p12File">Выберите ЭЦП ключ:</label>
        <input
          type="file"
          id="p12File"
          accept=".p12"
          onChange={handleFileChange}
        />
      </div>
      <UIInput value={password} onChange={e => setPassword(e.currentTarget.value)} name={"password"} type={"password"} label={"Пароль"}/>
      <UIButton className={"w-full h-[50px] rounded-md bg-primary text-white"} type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Загрука...' : 'Войти'}
      </UIButton>
    </form>
  );
};

export default LoginForm;
