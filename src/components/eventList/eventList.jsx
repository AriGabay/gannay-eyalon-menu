import React, { Fragment, useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../menu/menu.css';
import './eventList.css';
import RemoveBtn from '../removeBtn/removeBtn';
import { removeFromEvent, sendEvent } from '../../services/cart-service';
import { ImageCloud } from '../ImageCloud/ImageCloud';
import { InputLabel } from '../inputLabel/inputLabel';
import SignatureCanvas from 'react-signature-canvas';
import { toast } from 'react-toastify';

export default function EventList({ setEventListIsOpen }) {
  const { eventData, eventInfo } = useSelector((state) => state);
  const [products, setProducts] = useState({});
  let signCanvas = useRef(null);

  const today = () => {
    let date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    date = dd + '/' + mm + '/' + yyyy;
    return date;
  };
  const [page, setPage] = useState(1);
  let eventInfoInputs = {
    today: today(),
    ...eventInfo,
    SeparationArea: 'לא',
    SeparationTables: 'לא',
  };
  const hashTitle = { today: 'תאריך ביצוע ההזמנה : ' };
  const dispatch = useDispatch();
  useEffect(() => {
    const copy = {};
    Object.keys(eventData).forEach((categoryId) => {
      if (!Object.keys(eventData[categoryId]).length) {
        delete eventData[categoryId];
        return;
      }
      Object.keys(eventData[categoryId]).forEach((productId) => {
        copy[productId] = { ...eventData[categoryId][productId] };
        setProducts({ ...copy });
      });
    });
  }, [eventData]);
  useEffect(() => {
    const labels = document.getElementsByTagName('label');
    Array.from(labels).forEach((label) => {
      hashTitle[label.htmlFor] = label.innerText;
    });
    sessionStorage.setItem('hashTitle', JSON.stringify(hashTitle));
    if (!Object.keys(eventInfo).length) {
      const data = sessionStorage.getItem('eventInfo');
      const parseData = JSON.parse(data);
      if (data && Object.keys(parseData).length) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        eventInfoInputs = { ...parseData };
        saveEventInfo();
      }
    }
  }, []);
  const handelChange = ({ target }) => {
    let { name, value } = target;
    if (!value?.length) return;
    if (name === 'eventDate') {
      eventInfoInputs[name] = String(value).split('-').reverse().join('/');
      return;
    }
    eventInfoInputs[name] = value;
  };

  const removeBtn = (product) => {
    const eventDataNew = removeFromEvent(product);
    dispatch({ type: 'SET_EVENT_DATA', payload: { ...eventDataNew } });
    const newProducts = {};
    Object.keys(products).forEach((key) => {
      if (products[key]?.id !== product.id)
        newProducts[products[key].id] = { ...products[key] };
    });
    setProducts({ ...newProducts });
    toast.success('הוסר מהאירוע');
  };
  const saveEventInfo = () => {
    dispatch({ type: 'SET_EVENT_INFO', payload: { ...eventInfoInputs } });
    sessionStorage.setItem('eventInfo', JSON.stringify(eventInfoInputs));
  };
  return page === 1 ? (
    <Fragment>
      <div className="event-list-mobile" style={{ color: 'f5efdf' }}>
        <div className="grid-inputs">
          <div className="label-input">
            <h1>פרטי האירוע</h1>
          </div>
          <div className="input-area select-area"></div>
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'groomName'}
            inputType={'text'}
            labelText="שם מלא - חתן :"
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'brideName'}
            inputType={'text'}
            labelText="שם מלא - כלה :"
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'eventDate'}
            inputType={'date'}
            labelText="תאריך האירוע :"
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'phone'}
            inputType={'text'}
            labelText="פלאפון חתן או כלה :"
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'timeOfStartEvent'}
            inputType={'time'}
            labelText="שעת הגעת אורחים :"
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'busTime'}
            inputType={'text'}
            labelText="הסעות :"
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'originInvited'}
            inputType={'text'}
            labelText="מוצא האורחים :"
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'locationInvited'}
            inputType={'text'}
            labelText="מיקום מגורים של האורחים :"
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'numberInvited'}
            inputType={'number'}
            labelText="מספר האורחים המוזמנים :"
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'reserveTable'}
            inputType={'number'}
            labelText="מספר אורחים רזרבה :"
          />
          <div className="label-input">אנשים קשר</div>
          <div className="input-area select-area"></div>
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'contactGroom'}
            inputType={'text'}
            labelText="איש קשר - חתן :"
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'contactBride'}
            inputType={'text'}
            labelText="איש קשר - כלה :"
          />
          <label className="label-input" htmlFor="locationCanopy">
            מיקום החופה :
          </label>
          <select
            name="locationCanopy"
            className="input-area select-area"
            id="locationCanopy"
            onChange={handelChange}
          >
            <option value="">בהתאם למזג האוויר ושיקול דעת הנהלת האולם</option>
            <option value="inSide">בתוך האולם</option>
            <option value="outSide">בגן</option>
          </select>
          <label className="label-input" htmlFor="locationBuffet">
            מיקום הבופה :
          </label>
          <select
            onChange={handelChange}
            name="locationBuffet"
            className="input-area select-area"
            id="locationBuffet"
          >
            <option value="">בהתאם למזג האוויר ושיקול דעת הנהלת האולם</option>
            <option value="inSide">בתוך האולם</option>
            <option value="outSide">בגן</option>
          </select>
          <label className="label-input" htmlFor="SeparationTables">
            הפרדה שולחנות :
          </label>
          <select
            defaultValue={eventInfoInputs.SeparationTables}
            onChange={handelChange}
            name="SeparationTables"
            className="input-area select-area"
            id="SeparationTables"
          >
            <option value="לא">לא</option>
            <option value="כן">כן</option>
          </select>
          <label className="label-input" htmlFor="SeparationArea">
            הפרדה רחבת ריקודים :
          </label>
          <select
            defaultValue={eventInfoInputs.SeparationArea}
            onChange={handelChange}
            name="SeparationArea"
            className="input-area select-area"
            id="SeparationArea"
          >
            <option value="לא">לא</option>
            <option value="כן">כן</option>
          </select>
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'akumFee'}
            inputType={'text'}
            labelText={`אגרת אקו״ם :`}
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'rabbi'}
            inputType={'text'}
            labelText="רב מקדש :"
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'photographer'}
            inputType={'text'}
            labelText="צלם :"
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'dj'}
            inputType={'text'}
            labelText="תקליטן :"
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'guestArtist'}
            inputType={'text'}
            labelText={`להקה / אומן אורח :`}
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'magnets'}
            inputType={'text'}
            labelText={`מגנטים :`}
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'attractions'}
            inputType={'text'}
            labelText={`אטרקציות :`}
          />
          <div className="label-input">שולחן צוות :</div>
          <div
            className="input-area select-area"
            style={{ alignSelf: 'center' }}
          >
            יחויב ב 50%
          </div>
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'knightsTables'}
            inputType={'text'}
            labelText={`שולחנות אבירים :`}
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'colorNapkins'}
            inputType={'text'}
            labelText={`צבע מפיות :`}
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'colorMaps'}
            inputType={'text'}
            labelText={`צבע מפות :`}
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'comments'}
            inputType={'text'}
            labelText={`הערות :`}
          />
          <div className="label-input">
            חתימה דיגיטלית ב touch :
            <br />
            <br />
            <button
              className="sign-btn"
              onClick={() => signCanvas.current.clear()}
            >
              נקה
            </button>
          </div>
          <div className="input-area select-area">
            <SignatureCanvas
              canvasProps={{
                width: 250,
                height: 150,
                className: 'signCanvas',
                style: { background: 'white', borderRadius: '20px' },
              }}
              ref={signCanvas}
              onEnd={(event) =>
                (eventInfoInputs.sign = event.target.toDataURL())
              }
            />
          </div>
          <div className="label-input"></div>
        </div>
      </div>
      <div
        className="input-area select-area btns-actions-area"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <button onClick={() => saveEventInfo()} className="sign-btn">
          שמור
        </button>

        <button
          className="sign-btn"
          onClick={() => {
            saveEventInfo();
            setPage(2);
          }}
        >
          עבור עמוד
        </button>
      </div>
    </Fragment>
  ) : (
    <div>
      <div className="event-list" style={{ color: '#f5efdf' }}>
        <h1>פריטים שנוספו לאירוע</h1>
        {Object.keys(products).length ? (
          <div>
            <div className="menu">
              {Object.keys(products).map((product) => (
                <div style={{ maxWidth: '270px' }} key={products[product].id}>
                  <div className="product">
                    <div className="product-name">
                      {products[product].productName}
                    </div>
                    <div className="product-description">
                      {products[product].description}
                    </div>
                    <div className="product-img-container">
                      <ImageCloud
                        alt={products[product].productName}
                        imageId={products[product]?.imgUrl}
                        ClassName="product-img"
                      />
                    </div>
                    {!(products[product].autoAdd === true) ? (
                      <RemoveBtn onClick={() => removeBtn(products[product])} />
                    ) : (
                      <div>לא ניתן לשינוי</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="sign-btn"
              style={{ marginTop: '50px' }}
              onClick={() => {
                sendEvent({ eventInfoInputs })
                  .then(() => {
                    setEventListIsOpen(false);
                    toast.success('האירוע נשלח בהצלחה');
                  })
                  .catch(() => toast.error('ההזמנה נכשלה'));
              }}
            >
              שלח
            </button>
          </div>
        ) : (
          <h3 style={{ margin: '0 auto' }}>לא נוספו מוצרים</h3>
        )}
      </div>
    </div>
  );
}
