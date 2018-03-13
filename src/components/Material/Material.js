import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListMaterials from "./components/ListMaterials";
<<<<<<< Updated upstream:src/components/Material/Material.js
import MaterialAdd from "./components/MaterialAdd";




=======
>>>>>>> Stashed changes:src/components/Material/Materials.js

class Material extends Component {
    static propTypes = {
        materials: PropTypes.array.isRequired,
        fetchMaterials: PropTypes.func.isRequired,
        sendAddedMaterial: PropTypes.func.isRequired,
        deleteMaterial: PropTypes.func.isRequired,
        editMaterial: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { fetchMaterials, materials } = this.props;
        if (!materials.length)
            fetchMaterials();
    }

    render() {
        const {materials, fetchMaterials, sendAddedMaterial, deleteMaterial, editMaterial} = this.props;
        return (
            <div>
                <h2>Materials</h2>
                <ListMaterials
                    materials={materials}
                    fetchMaterials={fetchMaterials}
                    sendAddedMaterial={sendAddedMaterial}
                    editMaterial={editMaterial}
                    deleteMaterial={deleteMaterial}
                />
            </div>
        );
    }
}

export default Material;