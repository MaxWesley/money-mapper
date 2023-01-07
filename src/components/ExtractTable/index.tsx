import { useMemo } from "react";

interface ExtractTableProps {
  data?: any[];
}

function ExtractTable({ data }: ExtractTableProps): JSX.Element {
  const haveData = data?.length === 0;
    
  if (haveData) {
    return <h4>Nenhum extrato adicionado</h4>;
  }

  const extractData = useMemo(() => {
    if (haveData) {
      return data;
    }

    return [];
  }, []);

  return (
    <>
      {extractData.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.date}</td>
        </tr>
      ))}
    </>
  );
}

export { ExtractTable };
