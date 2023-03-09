import React from 'react';
import './addBtn.css';
export default function AddBtn(props) {
  return (
    <button style={{ maxWith: '80px', maxHeight: '80px' }} {...props}>
      הוסף
    </button>
  );
}
