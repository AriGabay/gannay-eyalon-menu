import React from 'react';
import '../eventList/eventList.css';
export const InputLabel = ({
  inputId,
  labelText,
  inputType,
  onChange,
  valueInput = {},
  secendLabel = '',
}) => {
  if (inputId === 'timeOfStartEvent') {
    inputType = 'time';
  }
  if (inputId === 'eventDate') {
    valueInput[inputId] = String(valueInput[inputId])
      .split('/')
      .reverse()
      .join('-');
  }
  if (inputId === 'lastUpdateBy') {
    const el = document.getElementById('lastUpdateBy');
    if (el) {
      el.disabled = true;
      el.style.color = '#f4eddc';
      labelText = 'עדכון על ידי : ';
    }
  }
  const customInputByType = () => {
    if (inputType === 'date' && inputId === 'eventDate') {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      const minDate = date.toISOString().split('T')[0];
      return (
        <input
          min={minDate}
          name={inputId}
          onChange={onChange}
          className="input-area"
          type={inputType}
          id={inputId}
          value={valueInput[inputId] ?? valueInput[inputId]}
        ></input>
      );
    }
    if (inputType === 'time' || inputType === 'number') {
      return (
        <input
          name={inputId}
          onChange={onChange}
          className="input-area"
          type={inputType}
          id={inputId}
          defaultValue={valueInput[inputId] ?? valueInput[inputId]}
        />
      );
    } else {
      return (
        <textarea
          name={inputId}
          onChange={onChange}
          className="input-area"
          type={inputType}
          id={inputId}
          defaultValue={valueInput[inputId] ?? valueInput[inputId]}
        />
      );
    }
  };
  return (
    <React.Fragment>
      {!secendLabel.length ? (
        <label className="label-input" htmlFor={inputId}>
          {labelText}
        </label>
      ) : (
        <div
          className="label-input"
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <label htmlFor={inputId}>
            {labelText}
            <br />
            {secendLabel}
          </label>
        </div>
      )}
      {customInputByType()}
    </React.Fragment>
  );
};
