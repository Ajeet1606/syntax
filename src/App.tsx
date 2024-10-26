import "./App.css";
import Home from "./pages/Home";
import { ThemeProvider } from "./components/custom/ThemeProvider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Home />
      </ThemeProvider>
    </>
  );
}

export default App;
