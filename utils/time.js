
export function formatDate(isoString) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  const date = new Date(isoString);
  return date.toLocaleDateString('es-ES', options);
}
