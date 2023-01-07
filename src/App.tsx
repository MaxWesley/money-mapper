import { useState } from "react";
import { ExtractInput, IHandleSelectExtract } from "./components/ExtractInput";
import { ExtractTable } from "./components/ExtractTable";
import { Logo } from "./components/Logo";

import { parse } from "papaparse";
import { FilterBar } from "./components/FilterBar";
import { formatBRL } from "./utils/formatBRL";

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

  function sumField(arr: any[], field: string) {
    const transactions = arr.slice(0, arr.length - 1);
    return transactions.reduce(
      (total, currentValue) => total + Number(currentValue[field]),
      0
    );
  }

  const totalInExtract = sumField(data, "Valor");

  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          <Logo />

          {data.length === 0 && <ExtractInput onChange={handleSelectExtract} />}
          {data.length > 0 && (
            <>
              <FilterBar />
              <p className="mb-4">
                <strong>Total:</strong> {formatBRL(totalInExtract)} <br />
                <span
                  className={
                    totalInExtract < 0 ? "text-rose-500" : "text-green-500"
                  }>
                  {totalInExtract < 0
                    ? "Que chato... Seu saldo está negativo 😕"
                    : "Parabéns! Seu saldo está positivo. 🎉"}
                </span>
              </p>
              <ExtractTable data={data} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
