export const UserTypes = {
    CUSTOMER: 'customer',
    EXECUTOR: 'executor',
};

export interface TokenData {
    UserID: string;
    Email: string;
    Role: string;
}
