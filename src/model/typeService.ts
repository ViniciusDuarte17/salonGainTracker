
interface IvalueTotal {
    valorTotal: number
}

export interface ItypeService {
    id: string;
    typeService: string;
    valueService: number;
    amount: number;
    dataTracker: Date;
    clientId?: string;
    valueTotalByService?: number;
}

export type CombineTipeService = Array<ItypeService | IvalueTotal>;

export interface ItypeServiceDTO {
    typeService: string;
    valueService: number;
    amount: number;
}