import { ItypeService } from "../model/typeService";
import { BaseDatabase } from "./BaseDatabase";


export class TypeServiceDatabase extends BaseDatabase {

    private static TABLE_NAME = "type_service_tracker";

    public async createClientService (inputService: ItypeService): Promise<void> {
        try {
            await this.getConnection()
            .insert({
                id: inputService.id,
                type_service: inputService.typeService,
                value_service: inputService.valueService,
                amount: inputService.amount,
                data_tracker: inputService.dataTracker,
                client_id: inputService.clientId
            })
            .into(TypeServiceDatabase.TABLE_NAME)
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}