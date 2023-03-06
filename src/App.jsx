import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Modal from './components/modal/modal';
import { useEffect } from 'react';
import { getEvent } from './services/cart-service';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from './pages/Menu/Menu';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import EventList from './components/eventList/eventList';
import EventDetails from './components/eventDetails/eventDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Menu />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/eventList',
    element: <EventList />,
  },
]);

function App() {
  const { modalIsOpen } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const eventData = getEvent();
    if (eventData && Object.keys(eventData).length > 0) {
      dispatch({ type: 'SET_EVENT_DATA', payload: { ...eventData } });
    }
  }, [dispatch]);

  return (
    <div className="App black-backgroud">
      <EventDetails />
      <RouterProvider router={router} />
      {modalIsOpen && <Modal />}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={true}
        rtl
        pauseOnFocusLoss
        draggable={true}
        pauseOnHover={true}
        theme="light"
        toastStyle={{ background: '#f4eddc', margin: '0 50px' }}
      />
      <a href="/#" className="top">
        לתחילת העמוד &#8593;
      </a>
    </div>
  );
}

export default App;
