import InputForm from "./InputForm.js";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>최민준 과제 </h1>
      <div className="search-Container">
        <InputForm />
        <button className="search-Button">검색</button>
      </div>
    </div>
  );
}

export default App;
