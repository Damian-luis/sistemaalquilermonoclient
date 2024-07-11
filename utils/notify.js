import toast from 'react-hot-toast';

const notify = (type, message) => {
  if (type === 'success') {
    toast.success(message);
  } else if (type === 'error') {
    toast.error(message);
  } else {
    console.warn('Tipo de notificación no reconocido:', type);
  }
};

export default notify;
