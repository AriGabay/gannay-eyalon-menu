import React from 'react';
import '../addBtn/addBtn.css';
export default function RemoveBtn(props) {
  return (
    <div className="add-btn">
      <button
        style={{ maxWith: '80px', maxHeight: '80px', padding: '10px' }}
        {...props}
      >
        הסר
      </button>
    </div>
  );
}
