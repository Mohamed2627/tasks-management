import {
  BrowserRouter,
} from "react-router";
import ErrorBoundary from "./components/Shared/ErrorBoundary";;
import AppRoutes from "./routes";
import AppProviders from "./providers";

function App() {

  return (
    <AppProviders>
      <BrowserRouter>
        <ErrorBoundary >
          <AppRoutes />
        </ErrorBoundary>
      </BrowserRouter>
    </AppProviders>
  )
}

export default App
