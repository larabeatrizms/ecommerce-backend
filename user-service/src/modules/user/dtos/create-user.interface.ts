export interface CreateUserInterface {
  id: number;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  address: {
    street: string;
    postal_code: string;
    number: number;
    city: string;
    state: string;
    neighborhood: string;
    complement?: string;
  };
  payment: {
    type: 'ON_CASH_DELIVERY';
  };
}
