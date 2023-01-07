import { useState } from "react";
import { ExtractInput, IHandleSelectExtract } from "./components/ExtractInput";
import { ExtractTable } from "./components/ExtractTable";
import { Logo } from "./components/Logo";

import { parse, ParseResult } from "papaparse";

function App() {
  const [data, setData] = useState<any[]>([]);

  const handleSelectExtract = (event: IHandleSelectExtract) => {
    const file = event.target.files![0];
    parse(file, {
      header: true,
      download: true,
      complete: (results: ParseResult<any>) => {
        console.log(results.data);
        setData(results.data);
      },
    });
  };

  return (
    <div className="App">
      <Logo />
      <ExtractInput onChange={handleSelectExtract} />
      <br />
      <ExtractTable data={data} />
    </div>
  );
}

export default App;
