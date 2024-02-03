export interface Interest {
    value: string;
    label: string;
}

export interface StudentRegisterInterface {
    firstName: string;
    lastName: string;
    interests: Array<string>;
    email: string;
    profilePic?: {
        name: string;
        key?: string;
        url?: string;
    };
    mobile?: string;
    password?: string;
    isGoogleUser: boolean;
}
