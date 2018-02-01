import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListMaterials from "./components/ListMaterials";





class Material extends Component {
    static propTypes = {
        materials: PropTypes.array.isRequired,
        fetchMaterials: PropTypes.func.isRequired,
        addMaterial: PropTypes.func.isRequired,
        deleteMaterial: PropTypes.func.isRequired,
        editMaterial: PropTypes.func.isRequired,
    };


    render() {
        const {materials, deleteMaterial, editMaterial} = this.props;
        return (
            <div>
                <br />
                <ListMaterials
                    materials={materials}
                    editMaterial={editMaterial}
                    deleteMaterial={deleteMaterial}
                />
            </div>
        );
    }
}

export default Material;