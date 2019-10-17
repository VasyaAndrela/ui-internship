import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addToWishlist, removeFromWishlist } from '../../actions/actionsWishlist';
import WishlistPage from './WishlistPage';

const mapStateToProps = ({ reducerWishlist }) => ({
  wishlist: reducerWishlist.wishlist
});

const mapDispatchToProps = (dispatch) => ({
  addToWishlist: bindActionCreators(addToWishlist, dispatch),
  removeFromWishlist: bindActionCreators(removeFromWishlist, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(WishlistPage);
