import { ItypeService } from "../model/typeService";


export interface ITypeServiceRepository {
    createClientService (inputService: ItypeService): Promise<void>
}