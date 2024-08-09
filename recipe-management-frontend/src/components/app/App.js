import '../../assets/styles/App.css';
import Routes from '../../routes/Routes';
import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={Routes} />
    </ErrorBoundary>
  );
}

export default App;
