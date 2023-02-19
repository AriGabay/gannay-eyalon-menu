import { useDispatch, useSelector } from 'react-redux';
import '../../App.css';
import MenuComp from '../../components/menu/menu';
import NavBar from '../../components/navBar/navBar';
import { useEffect } from 'react';
import { getEvent } from '../../services/cart-service';
import { ReactComponent as EventDetailsIcon } from '../../assets/event-list-icon.svg';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const { productsCount } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const eventData = getEvent();
    if (eventData && Object.keys(eventData).length > 0) {
      dispatch({ type: 'SET_EVENT_DATA', payload: { ...eventData } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App black-backgroud">
      <div
        className="cart-icon-container"
        onClick={() => navigate('/eventList')}
      >
        <div className="count-container">
          <p style={{ marginRight: '10px' }}>פרטי האירוע</p>
          <EventDetailsIcon style={{ width: '50px', height: '50px' }} />
          <p style={{ marginTop: '-25px' }}>{productsCount}</p>
        </div>
      </div>
      <div className="grid-layout">
        <NavBar />
        <div className="screen-layout">
          <MenuComp />
        </div>
      </div>
    </div>
  );
}

export default Menu;
