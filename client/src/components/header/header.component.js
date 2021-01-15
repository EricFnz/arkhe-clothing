import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// Components
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';
// Layout
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';
import { ReactComponent as Logo } from '../../assets/logo-ixtlan-clothing.svg';

const Header = ({ currentUser, hidden, signOutStart }) => {
    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo />
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to="/shop">
                    SHOP
                </OptionLink>
                <OptionLink to="/contact">
                    CONTACT
                </OptionLink>
                {
                    currentUser ?
                    <OptionLink as="div" onClick={signOutStart}>SIGN OUT</OptionLink>
                    :
                    <OptionLink to="/signin">SIGN IN</OptionLink>
                }
                <CartIcon />
            </OptionsContainer>
            {hidden ? null :
            <CartDropdown />}
        </HeaderContainer>
    );
};

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);