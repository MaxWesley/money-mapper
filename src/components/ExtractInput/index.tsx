import { ChangeEvent } from "react";

export type IHandleSelectExtract = ChangeEvent<HTMLInputElement>;

interface IExtractInput {
  onChange: (event: IHandleSelectExtract) => void;
}

function ExtractInput({ onChange }: IExtractInput): JSX.Element {
  return (
    <div>
      <label htmlFor="extract-input">
        <p>Importe seus extratos aqui</p>
        <input
          type="file"
          name="extract-input"
          id="extract-input"
          onChange={onChange}
        />
      </label>
    </div>
  );
}

export { ExtractInput };
