/**
 *
 * Handle Error Message
 * @param error coming from http response
 * @return string The error string representation
 */
export const getHttpErrorMessage = (error: any) => {
  let statusCode = error.response?.status;
  if (statusCode === 500) {
      return 'Qualcosa è andato storto';
  }
  // TODO: Gestire tutte le casistiche di errore
  return 'Errore sconosciuto';
};