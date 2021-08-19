import { UserInfo } from "./UserInfo";

export interface UserAccount {
    username: string,
    password: string,
    info?: UserInfo[]
}