import { useState } from "react";
import { ExtractInput, IHandleSelectExtract } from "./components/ExtractInput";
import { ExtractTable } from "./components/ExtractTable";
import { Logo } from "./components/Logo";

import { parse } from "papaparse";
import { FilterBar } from "./components/FilterBar";
import { StatusTransactions } from "./components/StatusTransactions";

function App() {
  const [data, setData] = useState<any[]>([]);

  const mergeData = (data1: any, data2: any) => {
    return data1.concat(data2);
  };

  const readAndMergeCSV = (data: any[], files: any) => {
    let remaining = files.length;

    for (const file of files) {
      parse(file, {
        header: true,
        download: true,
        complete: (results) => {
          data = mergeData(data, results.data);
          remaining -= 1;
          if (remaining === 0) {
            setData(data);
          }
        },
      });
    }
  };

  const handleSelectExtract = (event: IHandleSelectExtract) => {
    const files = event.target.files;
    let data: any = [];
    readAndMergeCSV(data, files);
  };

  const balance = (arr: any[], field: string) => {
    if (arr.length === 0) return 0;
    const transactions = arr.slice(0, arr.length - 1);

    return transactions.reduce((total: number, currentValue) => {
      if (!currentValue["Valor"]) return total;

      return total + parseFloat(currentValue[field]);
    }, 0);
  };
 
  const received = (arr: any[], field: string) => {
    if (arr.length === 0) return 0;
    const transactions = arr.slice(0, arr.length - 1);

    return transactions.reduce((total: number, currentValue) => {
      if (!currentValue["Valor"]) return total;

      if (
        ``.concat(currentValue["Descrição"]).match("Transferência Recebida")
      ) {
        return total + parseFloat(currentValue[field]);
      }

      return total;
    }, 0);
  };

  const sent = (arr: any[], field: string) => {
    if (arr.length === 0) return 0;
    const transactions = arr.slice(0, arr.length - 1);

    return transactions.reduce((total: number, currentValue) => {
      if (!currentValue["Valor"]) return total;

      if (
        ``.concat(currentValue["Descrição"]).match("Transferência enviada")
      ) {
        return total + parseFloat(currentValue[field]);
      }

      return total;
    }, 0);
  };

  const finalBalance = balance(data, "Valor");
  const totalReceived = received(data, "Valor");
  const totalSent = sent(data, "Valor");

  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:w-full lg:pb-28 xl:pb-32">
          <Logo />
          {data.length > 0 && (
            <>
              <StatusTransactions
                finalBalance={finalBalance}
                totalReceived={totalReceived}
                totalSent={totalSent}
              />
              <p className="mt-8 mb-4 text-center">
                <span
                  className={
                    finalBalance < 0 ? "text-rose-500" : "text-green-500"
                  }>
                  {finalBalance < 0
                    ? "Que chato... Você gastou mais dinheiro do que recebeu 😕"
                    : "Parabéns! Seu saldo final foi positivo! 🎉"}
                </span>
              </p>
            </>
          )}
          {data.length === 0 && <ExtractInput onChange={handleSelectExtract} />}
          {data.length > 0 && (
            <>
              <FilterBar />
              <ExtractTable data={data} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
