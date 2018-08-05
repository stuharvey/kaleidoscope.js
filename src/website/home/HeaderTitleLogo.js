import { Link } from 'react-router-dom';
import React from 'react';

import './HeaderTitleLogo.css';

export default function HeaderTitleLogo() {
  /* eslint-disable max-len */
  return (
    <Link to="/">
      <div className="klyd-header-title-logo">
        Kaleidoscope
      </div>
    </Link>
  );
  /* eslint-enable max-len */
}
