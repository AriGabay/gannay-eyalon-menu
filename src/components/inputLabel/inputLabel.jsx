import React from 'react';
import '../eventList/eventList.css';
export const InputLabel = ({
  inputId,
  labelText,
  inputType,
  onChange,
  valueInput = {},
}) => {
  return (
    <React.Fragment>
      <label className="label-input" htmlFor={inputId}>
        {labelText}
      </label>
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
