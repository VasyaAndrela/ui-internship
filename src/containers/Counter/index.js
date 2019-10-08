import { connect } from 'react-redux';
import { increment, decrement } from '../../actions/actionsCounter';
import Counter from '../../components/Counter/Counter';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return {
    count: state.reducerCounter.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: bindActionCreators(increment, dispatch),
    decrement: bindActionCreators(decrement, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);