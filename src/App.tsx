function App() {
  return (
    <div className="App">
      <h2>Money Mapper</h2>
      <label htmlFor="extract-input">
        <p>Importe seus extratos aqui</p>
        <input type="file" name="extract-input" id="extract-input" />
      </label>
    </div>
  );
}

export default App;
