import { BaseError } from "../error/BaseError";
import { CombineTipeService, ItypeService, ItypeServiceDTO } from "../model/typeService";
import { IAuthenticator, IIDGenerator } from "../ports/Ports";
import { IClientRepository } from "../repository/clientRepository";
import { ITypeServiceRepository } from "../repository/clientServiceRepository";

export class TypeServiceBusiness {
  constructor(
    private clientDatabase: IClientRepository,
    private typeServiceDatabase: ITypeServiceRepository,
    private authenticator: IAuthenticator,
    private idGenerator: IIDGenerator
  ) { }

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

  async getTypeService(token: string): Promise<CombineTipeService[]> {

    if (!token) {
      throw new BaseError("É necessário passar o token de acesso no header authorization", 404);
    }

    const tokenData = this.authenticator.getData(token);

    const typeService = await this.typeServiceDatabase.getClientService(
      tokenData.id
    );

    let valorTotal = 0

    typeService.forEach(item => {
      if (item.valueTotalByService) {
        valorTotal += item.valueTotalByService;
      }
    });

    const newTypeService = [...typeService, { valorTotal }] as unknown as CombineTipeService[]

    return newTypeService;
  }

  async updateTypeService(id: string, token: string, serviceByType: ItypeServiceDTO): Promise<void> {
    const { typeService, valueService, amount } = serviceByType;

    if (!token) {
      throw new BaseError("É necessário passar o token de acesso no header authorization", 404);
    }

    if (!id) {
      throw new BaseError("É necessário passar o id do serviço", 422);
    }

    if (
      typeService === '' ||
      valueService === undefined ||
      amount === undefined
    ) {
      throw new BaseError("Nenhum dos campos deve estar em branco.", 422)
    }

    if (!typeService && !valueService && !amount) {
      throw new BaseError("Escolha ao menos um campo para editar!", 422)
    }

    await this.typeServiceDatabase.updateTypeService(id, serviceByType)

  }

}
