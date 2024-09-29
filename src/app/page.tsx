'use client';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/entities/user';
import { AdminDocuments, MyDocuments } from '@/widgets/documents';
import UIButton from '@/shared/ui/UI-Button';
import { UIPopup } from '@/shared/ui/UI-Popup';
import { SignPopup, useUploadDocument } from '@/entities/document';
import { toast } from 'react-toastify';
import { PopupContext } from '@/shared/providers';
import { NotificationPopup, useGetNotifications } from '@/entities/notification';

export default function Home() {

  const { user, logout } = useContext(AuthContext);
  const {signVisible, setNotificationsVisible, notificationsVisible} = useContext(PopupContext)
  const [tab, setTab] = useState<'admin' | 'user'>('user');

  const [uploadFileModalOpen, setUploadFileModalOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const uploadMutation = useUploadDocument();
  const {data: notifications} = useGetNotifications()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadMutation.mutate({ document: selectedFile }, {
        onSuccess: () => {
          toast.success("Файл успешно загружен");
          setUploadFileModalOpen(false);
        },
        onError: () => {
          toast.error("Ошибка при загрузке документа", {position: "top-right"});
        },
      });
    } else {
      toast.error("Выберите файл для загрузки");
    }
  };

  useEffect(() => {
    if (notifications && notifications.some(notification => !notification.is_read)) {
      setNotificationsVisible(true);
    }
  }, [notifications])

  if (!user) return;
  return (
    <div className={'flex flex-col gap-y-5'}>
      <div className={'flex justify-between items-center'}>
        <h1 className={'font-bold text-3xl'}>Добро пожаловать, <span className={'text-primary'}>{user.name}</span></h1>
        <div className={'flex gap-x-5 items-center'}>
          <UIButton onClick={() => setUploadFileModalOpen(true)} className={'h-[50px] bg-primary px-3 rounded-md'}>
            <p className={'text-white'}>Загрузить документ</p>
          </UIButton>
          <p onClick={logout} className={"text-primary underline cursor-pointer"}>Выйти с аккаунта</p>
        </div>
      </div>
      {user.role === 'admin' && (
        <div className={'flex items-center gap-x-3'}>
          <p
            onClick={() => setTab('user')}
            className={`${tab === 'user' && 'underline text-primary'} text-xl cursor-pointer`}>Пользователь</p>
          <p
            onClick={() => setTab('admin')}

            className={`${tab === 'admin' && 'underline text-primary'} text-xl cursor-pointer`}>Админ</p>
        </div>
      )}
      {tab === 'user' ? <MyDocuments /> : <AdminDocuments />}
      {uploadFileModalOpen && <UIPopup isOpen={uploadFileModalOpen} setIsOpen={setUploadFileModalOpen}>
        <div
          className={'bg-white p-5 rounded-md border-black border-2 border-opacity-25 outline-none'}
          onClick={e => e.stopPropagation()}>
          <h2 className="text-lg mb-4">Загрузить документ</h2>
          <input
            type="file"
            accept=".png, .jpg, .docx, .pdf" // Restrict file types
            onChange={handleFileChange}
            className="border border-gray-300 rounded p-2 mb-4 w-full"
          />
          <UIButton
            onClick={handleUpload}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-600"
            disabled={uploadMutation.isPending}
          >
            {uploadMutation.isPending ? 'Загрузка...' : 'Загрузить'}
          </UIButton>
        </div>
      </UIPopup>}
      {signVisible && <SignPopup />}

      {notificationsVisible && notifications && <NotificationPopup notifications={notifications} /> }

    </div>
  );
}
