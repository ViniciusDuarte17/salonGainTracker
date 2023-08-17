import { CombineTipeService, ItypeService } from "../model/typeService";


export interface ITypeServiceRepository {
    createClientService (inputService: ItypeService): Promise<void>
    getClientService(idClient: string): Promise<ItypeService[]>
}