
export interface Label {
  text: string;
}

export type AccountType = 'Локальная' | 'LDAP';

export interface Account {
  id: string; 
  labels: Label[]; 
  type: AccountType;
  login: string;
  password: string | null; 
}


export interface AccountFormData {
  labels: string; 
  type: AccountType;
  login: string;
  password?: string; 
}