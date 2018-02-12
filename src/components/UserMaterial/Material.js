import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListMaterials from "./components/ListMaterials";






class Material extends Component {
    static propTypes = {
        skill_materials: PropTypes.array.isRequired,
        skillMaterials: PropTypes.func.isRequired,

    };

    componentDidMount()
    {
        console.log(this.props.match.params.skill_id_mat);
            const {skillMaterials} = this.props;
            skillMaterials(this.props.match.params.skill_id_mat);
    };

    render() {
        const {skill_materials} = this.props;
        return (
            <div>
                <br />
                <ListMaterials
                    skill_materials={skill_materials}
                />
            </div>
        );
    }
}

export default Material;