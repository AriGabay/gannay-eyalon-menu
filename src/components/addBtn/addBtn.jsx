import React from 'react';
import './addBtn.css';
export default function AddBtn(props) {
  return (
    <div className="add-btn">
      <button style={{ maxWith: '80px', maxHeight: '80px' }} {...props}>
        +
      </button>
    </div>
  );
}
