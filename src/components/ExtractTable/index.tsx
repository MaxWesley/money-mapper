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
      <div className="relative max-h-96 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full max-h-80 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              {extractFieds.map((field) => (
                <th scope="col" className="px-6 py-3" key={field}>
                  {field}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {extractData.map((field, index) => {
              const description = ``.concat(field["Descrição"]).split("- ");

              if (description[0] === "undefined") return;

              return (
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                   <td className="px-6 py-4">{index}</td>
                  <td className="px-6 py-4">{field["Data"]}</td>
                  <td className="px-6 py-4">{field["Valor"]}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
                  </th>
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
