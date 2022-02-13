import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

// function ProtectedRoute({ children }) {
//      console.log('chilren -> ', children);

//      const { loading, isAuthenticated } = useSelector(state => state.auth);
//      // console.log('loading -> ', loading, ' isAuthenticated -> ', isAuthenticated);
//      return !loading && isAuthenticated ? children : <Navigate replace to="/auth/login" />
// }

function ProtectedRoute({ Admin, children }) {
     const { loading, isAuthenticated, user } = useSelector(state => state.auth);

     console.log('loading -> ', loading, ' isAuthenticated -> ', isAuthenticated);
     if (Admin === true && user && user.role !== 'admin') {
          return <Navigate replace to='/' />
     }
     return !loading && isAuthenticated ? children : <Navigate replace to="/auth/login" />
}


export default ProtectedRoute;