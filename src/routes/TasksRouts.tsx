import { lazy, Suspense } from 'react'
import { Route } from 'react-router';
import LoadingSpinner from '../components/Shared/LoadingSpinner';

const TaskList = lazy(() => import('../pages/Tasks'));
const TaskDetails = lazy(() => import('../pages/TaskDetails'));
const AddTask = lazy(() => import('../pages/AddTask'));

export const TasksRoutes = (
  <>
    <Route path="tasks">
      <Route
        index element={
          <Suspense fallback={<LoadingSpinner />}>
            <TaskList />
          </Suspense>
        }
      />
      <Route
        path=":taskId"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <TaskDetails />
          </Suspense>
        }
      />
    </Route>
    <Route
      path="add-task"
      element={
        <Suspense fallback={<LoadingSpinner />}>
          <AddTask />
        </Suspense>
      }
    />
  </>
)