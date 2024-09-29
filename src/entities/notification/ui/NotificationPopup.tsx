import { useContext, useState, useEffect } from 'react';
import { PopupContext } from '@/shared/providers';
import { UIPopup } from '@/shared/ui/UI-Popup';
import { Notification, useReadNotification } from '@/entities/notification';
import { extname } from 'path';
import { STATUS_NAMES } from '@/enums';
import { toast } from 'react-toastify';

export const NotificationPopup = ({ notifications }: { notifications: Notification[] }) => {
  const { notificationsVisible, setNotificationsVisible } = useContext(PopupContext);
  const [localNotifications, setLocalNotifications] = useState<Notification[]>(notifications);

  useEffect(() => {
    setLocalNotifications(notifications);
  }, [notifications]);

  const { mutate } = useReadNotification();

  const handleRead = (notificationId: number) => {
    mutate(notificationId, {
      onSuccess: () => {
        setLocalNotifications(prev => prev.filter(n => n.notification_id !== notificationId));
      },
      onError: () => {
        toast.error("Произошла ошибка", { position: "top-right" });
      }
    });
  };

  return (
    <UIPopup isOpen={notificationsVisible} setIsOpen={setNotificationsVisible}>
      <div onClick={e => e.stopPropagation()} className={"rounded-md bg-white p-5 w-[70%]"}>
        <h1 className={"text-xl"}>Уведомления</h1>
        {localNotifications.map(notification => (
          <div key={notification.notification_id} className={"w-full h-[70px] flex justify-between items-center"}>
            <div>
              <h2>
                {notification.document.document_name.length > 12
                  ? `${notification.document.document_name.slice(0, 12)}...${extname(notification.document.document_name)}`
                  : notification.document.document_name} {STATUS_NAMES[notification.document.status]}
              </h2>
              <p className={"text-black text-opacity-25"}>{notification.created_at}</p>
            </div>
            <p
              onClick={() => handleRead(notification.notification_id)}
              className={"text-primary underline cursor-pointer"}>
              Пометить прочитанным
            </p>
          </div>
        ))}
      </div>
    </UIPopup>
  );
};
