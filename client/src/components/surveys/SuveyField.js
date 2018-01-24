// Contains logic to render a single field & label
import React from 'react';

// We take only the input property from the props param array.
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      {/*{..input} basicly attaches all the input options from the input array*/}
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
