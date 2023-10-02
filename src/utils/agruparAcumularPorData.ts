import { ItypeService } from "../model/typeService";


export function agruparAcumularPorData(dados: ItypeService[]) {
  const mapaPorData = new Map();

   dados.forEach((item) => {
    const data = item.dataTracker.toString();
    const valorTotal = item.valueTotalByService;

    if (mapaPorData.has(data)) {
      const entradaExistente = mapaPorData.get(data);
      entradaExistente.valueTotalByService += valorTotal;
    } else {
      mapaPorData.set(data, { ...item });
    }
  });

  const resultado = Array.from(mapaPorData.values());

  return resultado;
}