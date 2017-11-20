import React from 'react'

const DevButtonNav = ({ title, history }) => (
    <button
      type="button"
      onClick={() => history.push('/my-new-location')}
    >
      {title}
    </button>
  );

  export default DevButtonNav;