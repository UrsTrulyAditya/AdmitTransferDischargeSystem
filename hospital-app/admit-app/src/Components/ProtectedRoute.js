import { Navigate, Route } from 'react-router-dom';

function ProtectedRoute({ children, ...rest }) {
  const token = localStorage.getItem('token');
  return (
    <Route {...rest}>
      {token ? children : <Navigate to="/" replace />}
    </Route>
  );
}
export default ProtectedRoute;