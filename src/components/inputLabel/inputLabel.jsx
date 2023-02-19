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

      {inputType === 'time' ||
      inputType === 'date' ||
      inputType === 'number' ? (
        <input
          name={inputId}
          onChange={onChange}
          className="input-area"
          type={inputType}
          id={inputId}
          defaultValue={valueInput[inputId] ?? valueInput[inputId]}
        />
      ) : (
        <textarea
          name={inputId}
          onChange={onChange}
          className="input-area"
          type={inputType}
          id={inputId}
          defaultValue={valueInput[inputId] ?? valueInput[inputId]}
        />
      )}
    </React.Fragment>
  );
};
