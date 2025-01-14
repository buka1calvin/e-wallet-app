export const createCustomError = (name: string, message: string, status = 500) => {
    const error:any = new Error(message);
    error.name = name; 
    error.status = status;
    return error;
  };