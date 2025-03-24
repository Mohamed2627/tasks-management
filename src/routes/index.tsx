import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router"
import LoadingSpinner from "../components/Shared/LoadingSpinner"
import RootLayout from "../components/Shared/RootLayout"
import { TasksRoutes } from "./TasksRouts";

const Home = lazy(() => import('../pages/Home'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <Suspense fallback={<LoadingSpinner />}>
          <RootLayout />
        </Suspense>
      } >
        <Route index element={
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        } />
        {TasksRoutes}
      </Route>
      <Route path="*" element={
        <Suspense fallback={<LoadingSpinner />}>
          <NotFound />
        </Suspense>
      } />
    </Routes>
  )
}

export default AppRoutes