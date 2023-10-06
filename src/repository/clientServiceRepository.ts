import { ItypeService, ItypeServiceDTO } from "../model/typeService";


export interface ITypeServiceRepository {
  createClientService(inputService: ItypeService): Promise<void>;
  getClientService(idClient: string): Promise<ItypeService[]>;
  updateTypeService(id: string, typeService: ItypeServiceDTO): Promise<void>;
}