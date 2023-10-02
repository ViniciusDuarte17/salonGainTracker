import { BaseError } from "../error/BaseError";
import { CombineTipeService, ItypeService, ItypeServiceDTO } from "../model/typeService";
import { IAuthenticator, IIDGenerator } from "../ports/Ports";
import { IClientRepository } from "../repository/clientRepository";
import { ITypeServiceRepository } from "../repository/clientServiceRepository";
import { agruparAcumularPorData } from "../utils/agruparAcumularPorData";

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

  async getTypeService(token: string): Promise<ItypeService[]> {

    if (!token) {
      throw new BaseError("É necessário passar o token de acesso no header authorization", 404);
    }

    const tokenData = this.authenticator.getData(token);

    const typeService = await this.typeServiceDatabase.getClientService(
      tokenData.id
    );

    return typeService;
  }

  async updateTypeService(id: string, token: string, serviceByType: ItypeServiceDTO): Promise<void> {
    const { typeService, valueService, amount } = serviceByType;

    if (!token) {
      throw new BaseError("É necessário passar o token de acesso no header authorization", 404);
    }

    this.authenticator.getData(token);

    if (!id) {
      throw new BaseError("É necessário passar o id do serviço", 422);
    }

    if (
      typeService === undefined ||
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

  async getTypeServiceByMes(token: string): Promise<ItypeService[]> {
    const servicos = [
      {
        id: "11dc9cf2-ded3-45f6-9995-521782bc79a6",
        typeService: "corte completo",
        valueService: 30,
        amount: 4,
        dataTracker: "2023-10-01T16:13:18.000Z",
        valueTotalByService: 120,
      },
      {
        id: "49d210d8-af8a-4860-9457-7d6d26144db0",
        typeService: "buço",
        valueService: 10,
        amount: 2,
        dataTracker: "2023-09-29T08:52:23.000Z",
        valueTotalByService: 20,
      },
      {
        id: "5f806fb8-e1c3-4c61-9c28-1a3f5388e3be",
        typeService: "corte completo",
        valueService: 30,
        amount: 5,
        dataTracker: "2023-09-28T16:15:40.000Z",
        valueTotalByService: 150,
      },
      {
        id: "9f14a091-8521-44da-b146-cdcfc8fe062c",
        typeService: "corte simples",
        valueService: 20,
        amount: 3,
        dataTracker: "2023-09-28T16:17:16.000Z",
        valueTotalByService: 60,
      },
    ]

    if (!token) {
      throw new BaseError("É necessário passar o token de acesso no header authorization", 404);
    }

    const tokenData = this.authenticator.getData(token);

    const typeService = await this.typeServiceDatabase.getClientService(
      tokenData.id
    );

    
      servicos.forEach((item) => {
        const data = new Date(item.dataTracker);
        const ano = data.getFullYear();
        const mes = data.getMonth() + 1;
        const newMes = mes < 10 ? `0${mes}` : mes;
        item.dataTracker = newMes + "/" + ano;

        if (item.dataTracker === item.dataTracker) {
        }
      });
      
    const result = agruparAcumularPorData(servicos)

    return result;
  }

}
