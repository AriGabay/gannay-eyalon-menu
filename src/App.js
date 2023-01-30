import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import EventDetails from './components/eventDetails/eventDetails';
import Menu from './components/menu/menu';
import Modal from './components/modal/modal';
import NavBar from './components/navBar/navBar';
import { ReactComponent as EventDetailsIcon } from './assets/event-list-icon.svg';
import { useEffect, useState } from 'react';
import { getEvent } from './services/cart-service';
import EventList from './components/eventList/eventList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { modalIsOpen, productsCount } = useSelector((state) => state);
  const [eventListIsOpen, setEventListIsOpen] = useState(false);
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
      <div
        className="cart-icon-container"
        onClick={() => setEventListIsOpen(!eventListIsOpen)}
      >
        <div className="count-container">
          <p style={{ marginRight: '10px' }}>פרטי האירוע</p>
          <EventDetailsIcon style={{ width: '50px', height: '50px' }} />
          <p style={{ marginTop: '-25px' }}>{productsCount}</p>
        </div>
      </div>
      {eventListIsOpen ? (
        <div className="grid-layout grid-layout-event-list">
          <NavBar setEventListIsOpen={setEventListIsOpen} />
          <div className="screen-layout">
            <EventList setEventListIsOpen={setEventListIsOpen} />
          </div>
        </div>
      ) : (
        <div className="grid-layout">
          <NavBar setEventListIsOpen={setEventListIsOpen} />
          <div className="screen-layout">
            <Menu />
          </div>
        </div>
      )}
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
      <a href="#" className="top">
        חזרה לתחילת העמוד &#8593;
      </a>
    </div>
  );
}

export default App;
