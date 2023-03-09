import React from 'react';
import '../addBtn/addBtn.css';
export default function RemoveBtn(props) {
  return (
    <button style={{ maxWith: '80px', maxHeight: '80px' }} {...props}>
      הסר
    </button>
  );
}
