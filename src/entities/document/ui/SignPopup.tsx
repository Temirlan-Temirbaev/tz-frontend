import { UIPopup } from '@/shared/ui/UI-Popup';
import { useContext, useState } from 'react';
import { PopupContext } from '@/shared/providers';
import { useSignDocument } from '@/entities/document';
import { toast } from 'react-toastify';

export const SignPopup = () => {
  const {signVisible, signId, setSignVisible} = useContext(PopupContext)
  const [p12File, setP12File] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const { mutate: signDocument } = useSignDocument();

  const handleSignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (p12File && password && signId) {
      signDocument({ p12File, password, document_id: signId }, {
        onSuccess : () => {
          toast.success("Документ подписан", {position : "top-right"})
        },
        onError : () => {
          toast.success("Произошла ошибка при подписании документа", {position : "top-right"})
        }
      });
      setSignVisible(false);
    }
  };


  return <UIPopup isOpen={signVisible} setIsOpen={setSignVisible}>
    <form onClick={e => e.stopPropagation()} onSubmit={handleSignSubmit}
          className="flex flex-col gap-4 p-4 bg-white rounded-md">
      <h2 className="text-lg font-bold">Подписать документ</h2>
      <input
        type="file"
        accept=".p12"
        required
        onChange={(e) => {
          if (e.target.files) {
            setP12File(e.target.files[0]);
          }
        }}
      />
      <input
        type="password"
        placeholder="Пароль"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="bg-primary text-white rounded-md p-2">Подписать</button>
    </form>
  </UIPopup>
}