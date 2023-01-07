import { useMemo } from "react";
import { formatBRL } from "../../utils/formatBRL";

interface ExtractTableProps {
  data?: any[];
}

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
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {extractFieds.map((field) => (
                <th
                  scope="col"
                  className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  key={field}>
                  {field}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {extractData.map((item, index) => {
              const description = ``.concat(item["Descrição"]).split("- ");

              if (description[0] === "undefined") return;

              return (
                <tr key={index}>
                  <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                    {item.Data}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                    {formatBRL(item.Valor)}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                    {description.map((item, index) => (
                      <>
                        {index === 0 ? (
                          <p>
                            <strong>{item}</strong>
                          </p>
                        ) : (
                          <p>{item}</p>
                        )}
                      </>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export { ExtractTable };
