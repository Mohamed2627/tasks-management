import { ReactNode } from 'react'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from '../redux';
import LoadingSpinner from '../components/Shared/LoadingSpinner';


const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default ReduxProvider