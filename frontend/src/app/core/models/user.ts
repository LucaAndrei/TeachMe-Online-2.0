import { Contact } from './contact';

export interface User extends Contact {
    token: string;
    role: string;
    isAdmin: boolean;
    isValidated: boolean;
}