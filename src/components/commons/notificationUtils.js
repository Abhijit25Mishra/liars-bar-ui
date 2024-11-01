import { notification } from 'antd';

const openNotification = (pauseOnHover, notificationObj) => {
  return () => {
    notification.open({
      message: notificationObj?.title || "Notification Title",
      description: notificationObj?.description || "Description Placeholder",
      showProgress: true,
      pauseOnHover,
    });
  };
};

export default openNotification;
