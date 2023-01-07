import { useMemo } from "react";

interface ExtractTableProps {
  data?: any[];
}

import "./index.css";

function ExtractTable({ data }: ExtractTableProps): JSX.Element {
  const isNotEmpty = data && data.length > 0;

  if (!isNotEmpty) {
    return <h4>Nenhum extrato adicionado</h4>;
  }

  const extractData = useMemo(() => {
    if (isNotEmpty) {
      return data;
    }

    return [];
  }, []);

  const extractFieds = useMemo(() => {
    if (isNotEmpty) {
      const fields = Object.keys(data[0]).filter(
        (field) => field !== "Identificador"
      );

      return fields;
    }

    return [];
  }, []);

  return (
    <>
      <table>
        <tr>
          {extractFieds.map((field) => (
            <th key={field}>{field}</th>
          ))}
        </tr>
        {extractData.map((item, index) => (
          <tr key={index}>
            <td>{item.Data}</td>
            <td>{item.Valor}</td>
            <td>{item["Descrição"]}</td>
          </tr>
        ))}
      </table>
    </>
  );
}

export { ExtractTable };
