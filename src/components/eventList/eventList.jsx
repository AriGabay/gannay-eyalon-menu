import React, { Fragment, useMemo, useRef } from 'react';
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
import { useNavigate } from 'react-router-dom';

export default function EventList() {
  const { eventData, eventInfo } = useSelector((state) => state);
  const [products, setProducts] = useState({});
  const [errorsInputs, setErrorsInputs] = useState({});
  let signCanvas = useRef(null);
  const navigate = useNavigate();

  const today = () => {
    let date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    date = dd + '/' + mm + '/' + yyyy;
    return date;
  };
  const [page, setPage] = useState(1);
  let eventInfoInputs = useMemo(() => {
    return {
      today: today(),
      ...eventInfo,
      separationArea: 'לא',
      separationTables: 'לא',
    };
  }, [eventInfo]);

  const hashTitle = {
    today: 'תאריך ביצוע ההזמנה : ',
    sign: 'חתימה : ',
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      signCanvas &&
      signCanvas.current &&
      signCanvas.current.isEmpty() &&
      Object.keys(eventInfoInputs).length &&
      eventInfoInputs.sign
    ) {
      signCanvas.current.fromDataURL(eventInfoInputs.sign, {
        width: 250,
        height: 150,
      });
    }
  }, [signCanvas, eventInfoInputs]);
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
      saveEventInfo();
      return;
    }
    if (name === 'email') {
      // eslint-disable-next-line no-useless-escape
      const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (reg.test(value)) {
        eventInfoInputs[name] = value;
        removeError(name);
      } else {
        setErrorsInputs((prev) => ({ ...prev, [name]: 'אימייל לא חוקי' }));
      }
      saveEventInfo();
      return;
    }
    eventInfoInputs[name] = value;
    saveEventInfo();
  };

  const removeError = (errorName) => {
    const newErrorsInputs = Object.keys(errorsInputs).filter(
      (errorNameInput) => errorNameInput !== errorName
    );
    setErrorsInputs(newErrorsInputs);
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
  const removeEventInfo = () => {
    sessionStorage.clear();
    toast.success('האירוע נמחק בהצלחה !');
    setTimeout(() => {
      navigate('/');
    }, 2500);
  };
  return page === 1 ? (
    <Fragment>
      <div className="event-list-mobile" style={{ color: 'f5efdf' }}>
        <div className="grid-inputs">
          <div className="label-input">
            <h1>פרטי האירוע</h1>
          </div>
          <div className="input-area select-area">
            {Object.keys(errorsInputs).length > 0 &&
              Object.keys(errorsInputs).map((error) => {
                return <p>*{errorsInputs[error]}</p>;
              })}
          </div>
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'groomName'}
            inputType={'text'}
            secendLabel="ומספר פלאפון :"
            labelText="חתן - שם מלא"
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'brideName'}
            inputType={'text'}
            secendLabel="ומספר פלאפון :"
            labelText="כלה - שם מלא"
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'email'}
            inputType={'email'}
            labelText="מייל :"
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
          <div className="label-input" style={{ fontSize: '25px' }}>
            אנשי קשר
          </div>
          <div className="input-area select-area"></div>
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'createBy'}
            inputType={'text'}
            labelText="נוצר על ידי - מטעם האולם :"
          />
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
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'locationCanopy'}
            inputType={'text'}
            labelText="מיקום החופה :"
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'locationBuffet'}
            inputType={'text'}
            labelText="מיקום הבופה :"
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'separationTables'}
            inputType={'text'}
            labelText="הפרדה שולחנות :"
          />
          <InputLabel
            valueInput={eventInfoInputs}
            onChange={handelChange}
            inputId={'separationArea'}
            inputType={'text'}
            labelText="הפרדה רחבת ריקודים :"
          />
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
            inputId={'designer'}
            inputType={'text'}
            labelText="מעצב/ת :"
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
            style={{ alignSelf: 'center', fontSize: '20px' }}
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
          <div className="label-input label-input-sign">
            <p>חתימה דיגיטלית ב touch :</p>
            <button
              className="sign-btn"
              onClick={() => {
                if (eventInfoInputs.sign) {
                  const { sign, ...restData } = eventInfoInputs;
                  eventInfoInputs = restData;
                }
                saveEventInfo();
              }}
            >
              נקה
            </button>
          </div>
          <div className="input-area select-area sign-canvas">
            <SignatureCanvas
              canvasProps={{
                width: 250,
                height: 150,
                className: 'signCanvas',
                style: { background: 'white', borderRadius: '20px' },
              }}
              ref={signCanvas}
              onEnd={(event) => {
                eventInfoInputs.sign = event.target.toDataURL();
                saveEventInfo();
              }}
            />
          </div>
          <div className="label-input"></div>
        </div>
        <div
          className="input-area select-area btns-actions-area"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '3rem',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          <button className="sign-btn" onClick={() => removeEventInfo()}>
            נקה הכל
          </button>
          <button
            onClick={() => {
              saveEventInfo();
              toast.success('האירוע נשמר בהצלחה !');
            }}
            className="sign-btn"
          >
            שמור
          </button>
          <button onClick={() => navigate('/')} className="sign-btn">
            חזרה לתפריט
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
            <div className="btns-container">
              <button className="sign-btn" onClick={() => setPage(1)}>
                אחורה
              </button>
              <button onClick={() => navigate('/')} className="sign-btn">
                חזרה לתפריט
              </button>
              <button
                className="sign-btn"
                onClick={() => {
                  sendEvent({ eventInfoInputs })
                    .then((result) => {
                      if (result.status === 200) {
                        toast.success('האירוע נשלח בהצלחה');
                        navigate('/');
                      }
                    })
                    .catch(() => toast.error('ההזמנה נכשלה'));
                }}
              >
                שלח
              </button>
            </div>
          </div>
        ) : (
          <div className="btns-container">
            <button
              className="sign-btn"
              style={{ marginTop: '50px' }}
              onClick={() => setPage(1)}
            >
              אחורה
            </button>
            <h3 style={{ margin: '0 auto' }}>לא נוספו מוצרים</h3>
          </div>
        )}
      </div>
    </div>
  );
}
