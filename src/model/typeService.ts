

export interface ItypeService {
    id: string;
    typeService: string;
    valueService: number;
    amount: number;
    dataTracker: Date;
    clientId: string;
}

export interface ItypeServiceDTO {
    typeService: string;
    valueService: number;
    amount: number;
}