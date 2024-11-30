import useUserStore from '../../store/useStore'
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
    
    const {user} = useUserStore();

    if (user?._id){
        return <Outlet/>
    }
    else {
        return <Navigate to="/signin"/>
    }
}

export default PrivateRoute
