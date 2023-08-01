import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import { Context_error } from "./pages/context/ContextError";

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
