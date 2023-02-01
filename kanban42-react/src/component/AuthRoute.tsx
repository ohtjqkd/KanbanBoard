import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { Navigate } from 'react-router';
import { Iprops } from '../interface';
import Cookies from 'universal-cookie';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../store/action';
import Header from './header/Header'
import ModalSet from './modal/ModalSet';
import Footer from './Footer';



export default function AuthRoute({ children }: Iprops): JSX.Element {
  const { isLoggedIn, userId } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  const fetchUserFromLocal = async () => {
    const localLoggedIn = localStorage.getItem('loggedIn');
    const userId = JSON.parse(localLoggedIn!).id;
    dispatch(fetchUser({userId, isLoggedIn}));
  }
  useEffect(() => {
    const access_token = new Cookies().get('access_token');
    const localLoggedIn = localStorage.getItem('loggedIn');
    if (!!!access_token) {
      dispatch({type: 'LOG_OUT'});
      localStorage.removeItem('loggedIn')
    }
    if (localLoggedIn) fetchUserFromLocal();
  }, [userId, isLoggedIn]);
  if ((!isLoggedIn && !userId) && !localStorage.getItem('loggedIn'))
    return (<Navigate to={'/signin'}></Navigate>)
  return (
    <div id="sub-root">
      <div id="surface">
        <Header />
        <div id="main">
          { children }
        </div>
        <Footer />
      </div>
      <ModalSet />
    </div>
  );
}