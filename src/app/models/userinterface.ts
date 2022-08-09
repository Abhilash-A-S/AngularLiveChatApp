export interface IUser {
    uid: string;
    gender: string;
    imageUrl: string,
    userName: string;
    createdDate: Date;
    dateOfBirth: string;
}
export interface IUserIcons {
    male: Array<string>;
    female: Array<string>;
}