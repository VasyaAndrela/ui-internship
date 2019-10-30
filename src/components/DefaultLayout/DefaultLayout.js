import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';

import Header from '../Header';
import Footer from '../Footer';
import Brands from '../Brands';
import ShippingInfo from '../ShippingInfo';
import Notifications from '../Shared/Notifications';


import './DefaultLayout.scss';
import HomePageSkeleton from '../HomePageSkeleton/HomePageSkeleton';
import PlpSkeleton from '../PlpSkeleton/PlpSkeleton';

const category = 'products';

class DefaultLayout extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentDidMount() {
    const { fetchProducts } = this.props;
    fetchProducts(category);
  }

  shouldComponentRender() {
    const { pending } = this.props;
    if (pending === false) return false;
    return true;
  }

  render() {
    const {
      component: Page,
      hideFooter,
      hideHeader,
      hideBrands,
      hideShippingInfo,
      location,
      productsList,
      ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={(matchProps) => {
          if ((matchProps.match.path === '/:category') && !productsList.length) {
            return (
              <PlpSkeleton />
            );
          }
          if ((matchProps.match.path === '/home' || matchProps.match.path === '/') && !productsList.length) {
            return (
              <HomePageSkeleton />
            );
          } return (
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                timeout={300}
                classNames="fade"
              >
                <>
                  {!hideHeader && <Header />}
                  <Notifications type />
                  <Page {...matchProps} />
                  {!hideBrands && <Brands />}
                  {!hideShippingInfo && <ShippingInfo />}
                  {!hideFooter && <Footer />}
                </>
              </CSSTransition>
            </TransitionGroup>
          );
        }}
      />
    );
  }
}

DefaultLayout.propTypes = {
  // Component which displayed as main content
  location: PropTypes.any.isRequired,
  component: PropTypes.any,
  hideFooter: PropTypes.bool,
  hideHeader: PropTypes.bool,
  hideBrands: PropTypes.bool,
  hideShippingInfo: PropTypes.bool
};

DefaultLayout.defaultProps = {
  component: null,
  hideFooter: false,
  hideHeader: false,
  hideBrands: false,
  hideShippingInfo: false
};
export default DefaultLayout;
