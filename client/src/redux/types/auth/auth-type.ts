import { UserModel } from '../../../models/user-model';
export interface Auth {
    token: string | object | null;
    isAuthenticated: boolean | null;
    loading: boolean;
    user: UserModel
    refreshPage:boolean
}
