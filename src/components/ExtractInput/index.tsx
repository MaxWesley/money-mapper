function ExtractInput(): JSX.Element {
  return (
    <div>
      <label htmlFor="extract-input">
        <p>Importe seus extratos aqui</p>
        <input type="file" name="extract-input" id="extract-input" />
      </label>
    </div>
  );
}

export { ExtractInput };
