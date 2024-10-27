import "./App.css";
import Home from "./pages/Home";
import { ThemeProvider } from "./components/custom/ThemeProvider";
import { Toaster } from "./components/ui/toaster";
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Home />
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
