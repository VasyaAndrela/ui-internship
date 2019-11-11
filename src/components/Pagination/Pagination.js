import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './Pagination.scss';

const CN = 'pagination';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfPages: props.numberOfPages,
      isValidInput: true,
      isAnimation: false
    };

    this.changeCurrentNumber = this.changeCurrentNumber.bind(this);
    this.renderNumbers = this.renderNumbers.bind(this);
    this.goToPrevCurrentNumber = this.goToPrevCurrentNumber.bind(this);
    this.goToNextCurrentNumber = this.goToNextCurrentNumber.bind(this);
    this.checkThenChangeCurrentNumber = this.checkThenChangeCurrentNumber.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    const { currentPage } = this.props;
    this.inputRef.current.value = currentPage;
  }

  componentDidUpdate({ currentPage: prevCurrentPage }) {
    const { currentPage, isValidInput } = this.props;

    if (prevCurrentPage !== currentPage) {
      this.inputRef.current.value = currentPage;
      !isValidInput && this.setState({
        isValidInput: true
      });
    }
  }

  onAnimationEnd() {
    this.setState({
      isAnimation: false
    });
  }

  changeCurrentNumber(e) {
    const { setCurrentPage } = this.props;

    setCurrentPage(+e.target.innerText);
  }

  goToPrevCurrentNumber() {
    const { setCurrentPage } = this.props;
    const { currentPage } = this.props;

    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  goToNextCurrentNumber() {
    const { numberOfPages } = this.state;
    const { setCurrentPage, currentPage } = this.props;

    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  checkThenChangeCurrentNumber(e) {
    const { numberOfPages } = this.state;
    const { setCurrentPage } = this.props;
    const {
      target: { value: inputValue }
    } = e;
    if (inputValue === '') {
      this.setState({
        isValidInput: true
      });
      return;
    }

    if (inputValue > numberOfPages || inputValue < 1) {
      this.setState({
        isValidInput: false,
        isAnimation: true
      });
    } else {
      setCurrentPage(+inputValue);
      this.setState({
        isValidInput: true
      });
    }
  }

  renderNumbers() {
    const { numberOfPages } = this.state;
    const { visibleNumbers, currentPage } = this.props;
    const arrayOfPages = [...Array(numberOfPages)].map((e, i) => i + 1);
    const numbersFromCurrentPage = Math.floor(visibleNumbers / 2);
    let arrayOfVisibleNumOfPages = [...arrayOfPages];

    if (numberOfPages === 1) {
      return;
    }

    if (numberOfPages >= 3) {
      arrayOfVisibleNumOfPages = arrayOfPages.slice(currentPage - numbersFromCurrentPage - 1, currentPage + numbersFromCurrentPage);
      currentPage <= numbersFromCurrentPage
        && (arrayOfVisibleNumOfPages = arrayOfPages.slice(0, visibleNumbers));
      numberOfPages - currentPage < numbersFromCurrentPage
        && (arrayOfVisibleNumOfPages = arrayOfPages.slice(-visibleNumbers));
    }

    return arrayOfVisibleNumOfPages.map((num) => (
      <span
        className={cx(`${CN}-nav-number`, {
          [`${CN}-nav-number--active`]: num === currentPage
        })}
        onClick={this.changeCurrentNumber}
      >
        {num}
      </span>
    ));
  }

  render() {
    const { className, currentPage } = this.props;

    const {
      numberOfPages,
      isValidInput,
      isAnimation
    } = this.state;

    return (
      <div className={cx(CN, className)}>
        <div className={`${CN}-nav-input-container`}>
          <span className={`${CN}-nav-input-container__text`}>
            go to page
          </span>
          <input
            ref={this.inputRef}
            disabled={numberOfPages === 1}
            onInput={this.checkThenChangeCurrentNumber}
            className={cx(`${CN}-nav-input-container__input`, {
              [`${CN}-nav-input-container__input--error`]: !isValidInput,
              [`${CN}-nav-input-container__input--animation`]: isAnimation
            })}
            onAnimationEnd={this.onAnimationEnd}
            type="number"
            min="1"
            max={numberOfPages}
          />
          <span className={`${CN}-nav-input-container__text`}>
            {` / ${numberOfPages}`}
          </span>
        </div>
        <div className={`${CN}-nav-numbers`}>
          <div
            onClick={this.goToPrevCurrentNumber}
            className={cx(`${CN}-nav-arrow`, `${CN}-nav-arrow-left`, {
              [`${CN}-nav-arrow--disabled`]: currentPage === 1
            })}
          >
            <i className={`icon chevron left ${CN}-nav-arrow__icon`} />
          </div>
          {this.renderNumbers()}
          <div
            onClick={this.goToNextCurrentNumber}
            className={cx(`${CN}-nav-arrow`, `${CN}-nav-arrow-right`, {
              [`${CN}-nav-arrow--disabled`]: currentPage === numberOfPages
            })}
          >
            <i className={`icon chevron right ${CN}-nav-arrow__icon`} />
          </div>
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  className: PropTypes.string,
  numberOfPages: PropTypes.number.isRequired
};

Pagination.defaultProps = {
  className: ''
};

export default Pagination;
