import { ChangeEvent } from "react";

export type IHandleSelectExtract = ChangeEvent<HTMLInputElement>;

interface IExtractInput {
  onChange: (event: IHandleSelectExtract) => void;
}

function ExtractInput({ onChange }: IExtractInput): JSX.Element {
  return (
    <div className="w-full mt-6">
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="mt-1 sm:col-span-2 sm:mt-0">
          <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true">
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                  <span>Faça upload do seu extrato</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={onChange}
                    multiple
                  />
                </label>
                {/* <p className="pl-1">ou arraste e solte</p> */}
              </div>
              <p className="text-xs text-gray-500">Disponível para .CSV</p>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
}

export { ExtractInput };
