import dotenv from "dotenv";
import { AddressInfo } from "net";
import express from "express";
import cors from "cors"
import { clientRouter } from "./routes/clientRoute";
import { clientTypeService } from "./routes/clientTypeService";

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

app.use("/cliente",clientRouter);
app.use("/service", clientTypeService)

const server = app.listen(process.env.PORT || 3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});
