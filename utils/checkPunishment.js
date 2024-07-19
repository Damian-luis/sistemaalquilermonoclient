
export const checkPunishment = (user) => {
    const { lastRentalDate, punishment } = user;
  console.log("este es el valor de la funcion castigo")
  console.log(lastRentalDate)
  console.log(punishment)
    if (punishment) {
      const rentalDate = new Date(lastRentalDate);
      const habilitationDate = new Date(rentalDate);
      habilitationDate.setDate(rentalDate.getDate() + 7);
  
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
  
      return `Próxima habilitación el dia ${habilitationDate.toLocaleDateString('es-ES', options)}`;
    } else {
      return null;
    }
  };
  