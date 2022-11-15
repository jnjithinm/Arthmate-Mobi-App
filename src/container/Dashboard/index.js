import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import withSpinner from "../../HOC/withSpinner";
import * as actions from './actions';
import { userDataSelector } from '../App/selector';
import * as authActions from "../App/actions";

export const mapStateToProps = createStructuredSelector({
    userDataSelector: userDataSelector(),
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            dashboardAPI: actions.dashboardAPI,
            getUserDetails: actions.getUserDetails,
            globalLogin: actions.globalLogin,
            clearUserData: authActions.clearUserData,

        },
        dispatch,
    );
}

const container = compose(connect(mapStateToProps, mapDispatchToProps),
    withSpinner());

export default container;
