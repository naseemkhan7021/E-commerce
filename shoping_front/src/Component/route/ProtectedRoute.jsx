import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function ProtectedRoute({ Admin, children }) {
     const { loading, isAuthenticated, user } = useSelector(state => state.auth);

     if (Admin === true && user && user.role !== 'admin') {
          return <Navigate replace to='/' />
     }
     return !loading && isAuthenticated ? children : <Navigate replace to="/auth/login" />
}


export default ProtectedRoute;