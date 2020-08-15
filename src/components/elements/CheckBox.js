import React from 'react';

function Checkbox(props) {
  const { checked, handleChange, name } = props;

  return (
    <input
      name={name}
      className="journal-checkbox"
      type="checkbox"
      checked={checked}
      onChange={handleChange}
    />
  );
}

export default Checkbox;
