import { ExtractInput } from "./components/ExtractInput";
import { ExtractTable } from "./components/ExtractTable";
import { Logo } from "./components/Logo";

function App() {
  return (
    <div className="App">
      <Logo />
      <ExtractInput />
      <ExtractTable data={[]} />
    </div>
  );
}

export default App;
