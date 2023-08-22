import { app } from "./app"
import { clientRouter } from "./routes/clientRoute";
import { clientTypeService } from "./routes/clientTypeService";


app.use("/cliente",clientRouter);
app.use("/service", clientTypeService)