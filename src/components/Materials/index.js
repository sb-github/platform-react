import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMaterials, sendAddedMaterial, deleteMaterial, editMaterial } from "./materialActions";
import Material from "./Materials";


const mapStateToProps = state => {
    const { materials } = state;
    return {
        materials
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMaterials: bindActionCreators(fetchMaterials, dispatch),
        sendAddedMaterial: bindActionCreators(sendAddedMaterial, dispatch),
        deleteMaterial: bindActionCreators(deleteMaterial, dispatch),
        editMaterial: bindActionCreators(editMaterial, dispatch),

    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Material);