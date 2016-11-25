import React from 'react';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import messages from './messages';
import H1 from '../../components/h1';
import H2 from '../../components/h2';
import Popular from '../../containers/popular';
import styles from './_index.scss';

const wrapper = classnames(styles['wrapper'], 'whatever');

function Frontpage() {

  return (

    <div className={wrapper}>

      <div className={styles['left-column']}>

        <H1>
          <FormattedMessage {...messages.title} />
        </H1>

        <p>
          <FormattedMessage {...messages.descriptionOne} />
        </p>

        <p>
          <FormattedMessage {...messages.descriptionTwo} />
        </p>

      </div>

      <div className={styles['right-column']}>

        <H2>
          <FormattedMessage {...messages.headerTwo} />
        </H2>

        <Popular />

      </div>

    </div>
  );

}

export default Frontpage;
