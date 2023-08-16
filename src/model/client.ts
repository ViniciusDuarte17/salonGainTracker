
export interface Iclient {
    id: string;
    name: string;
    email: string;
    password: string;
}

export type clientInputDTO = {
    name: string;
    email: string;
    password: string;
}

export type clientLogintDTO = {
    email: string;
    password: string;
}