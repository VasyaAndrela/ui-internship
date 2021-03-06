import React from 'react';
import cx from 'classnames';

import { Button } from '@/shared';

import './OrderReview.scss';

const CN = 'order-review';

const OrderReview = () => (
  <div className={cx(CN)}>
       Please review all the information on this page.
    <br />
       Press the order now button to confirm your purchase.
    <Button className={`${CN}__button`}>order now</Button>
  </div>
);

export default OrderReview;
