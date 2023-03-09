import { useDispatch, useSelector } from 'react-redux';
import '../../App.css';
import MenuComp from '../../components/menu/menu';
import NavBar from '../../components/navBar/navBar';
import { useEffect, useState } from 'react';
import { getEvent } from '../../services/cart-service';
import { ReactComponent as EventDetailsIcon } from '../../assets/event-list-icon.svg';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function Menu() {
  const { productsCount } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const dataFromSession = sessionStorage.getItem('user');
    if (dataFromSession === null) {
      return;
    }
    const { token } = JSON.parse(dataFromSession);
    if (!token) return;
    try {
      const user = jwtDecode(token);
      if (!Object.keys(user).length) return;
      setIsAdmin(true);
    } catch (e) {
      console.log(e);
    }
  }, []);

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
        {isAdmin && (
          <div className="admin-btns-container">
            <p
              style={{ color: '#f5efdf', fontSize: '18px', fontWeight: 800 }}
              onClick={(e) => {
                e.stopPropagation();
                navigate('/admin');
              }}
            >
              עדכון תפריט
            </p>
            <h3
              style={{ cursor: 'pointer', color: '#f5efdf' }}
              onClick={(e) => {
                e.stopPropagation();
                sessionStorage.removeItem('user');
                window.location.reload();
              }}
            >
              Logout
            </h3>
          </div>
        )}
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
