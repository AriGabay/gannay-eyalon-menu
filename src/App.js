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
    <div className="App">
      <div className="black-backgroud">
        <EventDetails />
        <div
          className="cart-icon-container"
          onClick={() => setEventListIsOpen(!eventListIsOpen)}
        >
          <div className="count-container">
            <EventDetailsIcon style={{ width: '50px', height: '50px' }} />
            <p style={{ marginTop: '-25px' }}>{productsCount}</p>
          </div>
        </div>
        <div className="grid-layout">
          <NavBar setEventListIsOpen={setEventListIsOpen} />
          {eventListIsOpen ? (
            <div className="screen-layout">
              <EventList setEventListIsOpen={setEventListIsOpen} />
            </div>
          ) : (
            <div className="screen-layout">
              <Menu />
            </div>
          )}
        </div>
        {modalIsOpen && <Modal />}
      </div>
    </div>
  );
}

export default App;
