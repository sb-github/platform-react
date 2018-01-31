import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListMaterials from "./components/ListMaterials";
import MaterialAdd from "./components/MaterialAdd";




class Material extends Component {
    static propTypes = {
        materials: PropTypes.array.isRequired,
        fetchMaterials: PropTypes.func.isRequired,
        addMaterial: PropTypes.func.isRequired,
        deleteMaterial: PropTypes.func.isRequired,
    };


    render() {
        const {materials, addMaterial, deleteMaterial} = this.props;
        return (
            <div>
                <br />
                <ListMaterials
                    materials={materials}
                    deleteMaterial={deleteMaterial}
                />
                <MaterialAdd addMaterial={addMaterial}/>
            </div>
        );
    }
}

export default Material;