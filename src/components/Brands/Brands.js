import React, { Component } from 'react';
import cx from 'classnames';

import HttpService from '../../service/HttpService/httpService';
import Heading from '../Heading';

import './Brands.scss';

export const CN = 'brand';

class BrandsAndShippingInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brandsList: []
    };
  }

  componentDidMount() {
    this.getBrandsImages();
  }

  async getBrandsImages() {
    const userAPI = new HttpService();

    try {
      const response = await userAPI.get(`${process.env.SERVER_URL}/brands`);
      if (response && response.data) {
        this.setState({ brandsList: response.data });
      }
    } catch (error) {
      throw (new Error());
    }
  }

  renderBrands(brands) {
    return brands.map(({ logo }) => {
      const imageSrc = `${process.env.BRANDS_IMAGE_URL}/${logo}.png`;

      return (
        <li key={logo} className={`col-2 ${CN}__list-item`}>
          <img
            className={`${CN}__list-photo`}
            alt="brand logo"
            src={imageSrc}
          />
        </li>
      );
    });
  }

  render() {
    const { brandsList } = this.state;

    return (
      <div className={cx('content', CN)}>
        <Heading title="Brands" position="center" />
        <div className={`container ${cx(CN)}`}>
          <ul className={`${CN}__list`}>
            {this.renderBrands(brandsList)}
          </ul>
        </div>
      </div>
    );
  }
}

export default BrandsAndShippingInfo;
