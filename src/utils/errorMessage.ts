type ErrorMessageType = {
  status: number;
  message?: string;
};

export const errorMessage = ({ status, message }: ErrorMessageType) => {
  switch (status) {
    case 400:
      return `${message ? message : 'Something wrong with Your input data. Please check it again'}`;
    case 500:
      return "There is an error on our side. We're working on it. Try again later.";

    default:
      return "Unexpected error. Please, try again later.";
  }
};
