import { ItypeService, ItypeServiceDTO } from "../model/typeService";
import { BaseDatabase } from "./BaseDatabase";

export class TypeServiceDatabase extends BaseDatabase {
  private static TABLE_NAME = "type_service_tracker";

  public async createClientService(inputService: ItypeService): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: inputService.id,
          type_service: inputService.typeService,
          value_service: inputService.valueService,
          amount: inputService.amount,
          data_tracker: inputService.dataTracker,
          client_id: inputService.clientId,
        })
        .into(TypeServiceDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getClientService(idClient: string): Promise<ItypeService[]> {
    try {
      const typeService = await this.getConnection()
        .select(
          "id",
          "type_service AS typeService",
          "value_service AS valueService",
          "amount",
          "data_tracker AS dataTracker",
          this.getConnection().raw(
            "(value_service * amount) AS valueTotalByService"
          )
        )
        .from(TypeServiceDatabase.TABLE_NAME)
        .where("client_id", "=", idClient)
        .orderBy("dataTracker");
      return typeService;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async updateTypeService(
    id: string,
    serviceByType: ItypeServiceDTO
  ): Promise<void> {
    try {
      const { typeService, valueService, amount } = serviceByType;
      await this.getConnection()
        .from(TypeServiceDatabase.TABLE_NAME)
        .where({ id })
        .update({
          type_service: typeService,
          value_service: valueService,
          amount,
        });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
