function FilterBar(): JSX.Element {
  return (
    <form className="mt-8 mb-8 flex justify-center">
      <label htmlFor="filter-extract" className="sr-only">
        Filtrar no extrato
      </label>
      <input
        id="filter-extract"
        name="filter-extract"
        type="text"
        required
        className="w-full rounded-md border-2 border-gray-300 px-5 py-3 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs"
        placeholder="Filtrar no extrato"
      />
      <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Filtrar
        </button>
      </div>
    </form>
  );
}

export { FilterBar };
