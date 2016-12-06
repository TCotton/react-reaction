import React from 'react';

function InputCheckbox(props) {

  // console.dir(props);

  return (
    <dd className='checkbox' key={props.id}>

      <input id={`${props.name}-${props.id}`} type='checkbox' />
      <label htmlFor={`${props.name}-${props.id}`}>{props.name}</label>

    </dd>
  );

}

export default InputCheckbox;
