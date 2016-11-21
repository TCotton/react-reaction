import React, { PropTypes }  from 'react';
import styles from './_List.scss';

import ListItem from '../List';

function List(props) {

  if (props.items) {
    return (
      <div className={styles.list}>
        <ListItem items={props.items} />
      </div>
    );
  }
  return <div></div>;
}

List.propTypes = {
  items: PropTypes.array
};

export default List;
