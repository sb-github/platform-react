import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Graph from 'react-graph-vis';
import {interpolateRgb} from 'd3-interpolate';

class GraphSkill extends Component {
  static propTypes = {
    graphData: PropTypes.object.isRequired,
    fetchGraph: PropTypes.func.isRequired
  };

  constructor(props){
    super(props);

    this.state = {
      isBalanced: true,
      nodes: [],
      edges: [],
      options: {
        nodes: {
          borderWidth:0,
          size:50,
          color: {
            border: '#00152a',
            background: '#00152a'
          },
          font:{color:'#eeeeee'},
          scaling: {
            customScalingFunction: function (min,max,total,value) {
              return value/total;
            },
            min: 1,
            max: 250,
            label: {
              min:10,
              max:60
            }
          }
        },
        interaction: {
          hover: false,
          zoomView: false,
          dragView: false
        }
      },
      events: {
        click: this.onNodeClick
      },
      styles: {
        'width': '100%',
        'height': '800px',
        'background-color': '#00152a',
        'position': 'relative',
        'overflow': 'hidden',
        'touch-action': 'pan-y',
        'user-select': 'none',
        '-webkit-user-drag': 'none',
        '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)'
      }
    };
  };

  componentDidMount() {
    const skills = this.props.graphData.skills || [];
    const relations = this.props.graphData.relations || [];

    this.setState({
      nodes: this.renderNodes(skills, this.state.isBalanced),
      edges: this.renderEdges(relations)
    });
  };

  componentDidUpdate(prevProps) {
    if(prevProps.graphData.skills !== this.props.graphData.skills) {
      const {skills, relations} = this.props.graphData;

      this.setState({
        nodes: this.renderNodes(skills, this.state.isBalanced),
        edges: this.renderEdges(relations)
      });
    }
  };

  renderNodes = (nodes, isBalanced) => {
    return nodes.map(node => ({
      ...node,
      selected: false,
      shape: 'circularImage',
      image: node.image || 'images/noimage.png',
      value: isBalanced ? undefined : node.value
    }));
  };

  renderEdges = edges => {
    const colors = interpolateRgb('rgb(179, 179, 179)', 'rgb(45, 45, 45)');
    //const colors = interpolateRgb('rgb(255, 0, 0)', 'rgb(51, 0, 0)');
    //const colors = interpolateRgb('rgb(0, 128, 0)', 'rgb(0, 26, 0)');
    const maxValue = Math.max.apply(null, edges.map(edges => edges.value));
    const minValue = Math.min.apply(null, edges.map(edges => edges.value));
    const step = 1/(maxValue - minValue);

    return edges.map(edge => ({
      width: 7,
      length: 200,
      arrows:'',
      label: edge.value.toString(),
      color: {color: colors(step * edge.value)},
      ...edge,
      value: undefined
    }));
  };

  onNodeClick = event => {
    let nodes = this.state.nodes;

    if(event.nodes.length) {
      const selectedNode = nodes.filter(node => node.id === event.nodes[0])[0];

      if(selectedNode.selected)
      {
        this.props.fetchGraph({
          name: selectedNode.label,
          id: selectedNode.id
        });
      }

      nodes = nodes.map(node =>
        node.selected
          ? ({
            ...node,
            selected: false
          })
          : node
      );

      const mainNodeId = this.state.edges[0].from;

      if(!selectedNode.selected && selectedNode.id !== mainNodeId)
        nodes = nodes.map(node =>
          node.id === selectedNode.id
            ? ({
              ...node,
              selected: true
            })
            : node
        );
    } else {
      nodes = nodes.map(node =>
        node.selected
          ? ({
            ...node,
            selected: false
          })
          : node
      );
    }

    this.setState({nodes: nodes});
  };

  render() {
    const {styles, options, nodes, edges, events} = this.state;

    const graph = {
      nodes: nodes.map(node => node.selected
        ? ({
          ...node,
          label: 'Relations ' + node.label,
          image: 'images/relations.png'
        })
        : node
      ),
      edges
    };

    return (
      <Graph
        graph={graph}
        options={options}
        events={events}
        style={styles}
      />
    );
  }
}

export default GraphSkill;

