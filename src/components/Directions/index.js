import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDirections, sendAddedDirection, deleteDirection, editDirection } from "./directionActions";
import Directions from "./Directions";

const mapStateToProps = state => {
    const { dirs } = state;
    return {
        dirs
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDirections: bindActionCreators(fetchDirections, dispatch),
        sendAddedDirection: bindActionCreators(sendAddedDirection, dispatch),
        editDirection: bindActionCreators(editDirection, dispatch),
        deleteDirection: bindActionCreators(deleteDirection, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Directions);
