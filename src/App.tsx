import {
  BrowserRouter,
} from "react-router";
import ErrorBoundary from "./components/Shared/ErrorBoundary";;
import AppRoutes from "./routes";
import AppProviders from "./providers";
import Modal from 'react-modal';

Modal.setAppElement('#root');

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
