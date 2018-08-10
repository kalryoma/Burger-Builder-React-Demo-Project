import React from 'react';

import css from './Backdrop.css';

const backdrop = props => (
  props.show ? <div className={css.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;