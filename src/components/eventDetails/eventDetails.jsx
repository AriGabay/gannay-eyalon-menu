import React from 'react';
import './eventDetails.css';
import { ReactComponent as LogoSvg } from '../../assets/logo-gold.svg';

export default function EventDetails() {
  return (
    <div className="event-details">
      <div className="event-details-container">
        <div className="event-details-contant" style={{ cursor: 'pointer' }}>
          <a href="/">
            <LogoSvg />
          </a>
        </div>
      </div>
    </div>
  );
}
