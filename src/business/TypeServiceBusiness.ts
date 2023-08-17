import { BaseError } from "../error/BaseError";
import { ItypeService, ItypeServiceDTO } from "../model/typeService";
import { IAuthenticator, IIDGenerator } from "../ports/Ports";
import { IClientRepository } from "../repository/clientRepository";
import { ITypeServiceRepository } from "../repository/clientServiceRepository";

export class TypeServiceBusiness {
  constructor(
    private clientDatabase: IClientRepository,
    private typeServiceDatabase: ITypeServiceRepository,
    private authenticator: IAuthenticator,
    private idGenerator: IIDGenerator
  ) {}

  async createTypeService(
    token: string,
    inputService: ItypeServiceDTO
  ): Promise<void> {
    const id = this.idGenerator.generate();

    const tokenData = this.authenticator.getData(token);

    const client = await this.clientDatabase.getUserById(tokenData.id);


    if (!client.id) {
      throw new BaseError("Usário não autorizado!", 401);
    }

    if (
      !inputService.typeService ||
      !inputService.valueService ||
      !inputService.amount
    ) {
      throw new BaseError("É necessário preencher todos os compos", 422);
    }

    const currentData = new Date();

    const fusoHorarioBrasilia = -3;

    currentData.setUTCHours(currentData.getUTCHours() + fusoHorarioBrasilia);

    const populoClientService: ItypeService = {
      id,
      typeService: inputService.typeService,
      valueService: inputService.valueService,
      amount: inputService.amount,
      dataTracker: currentData,
      clientId: client.id,
    };

    await this.typeServiceDatabase.createClientService(populoClientService);
  }
}
