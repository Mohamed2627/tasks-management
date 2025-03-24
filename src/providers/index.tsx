import { ReactNode } from "react"
import ReactQueryProvider from "./ReactQueryProvider"
import ReduxProvider from "./ReduxProvider"
import { Toaster } from 'react-hot-toast';


const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider>
      <ReduxProvider>
        <Toaster position="top-center" />
        {children}
      </ReduxProvider>
    </ReactQueryProvider>
  )
}

export default AppProviders;