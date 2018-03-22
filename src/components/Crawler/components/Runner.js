import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Button, Popover } from 'antd';
import { Button as ButtonS } from 'semantic-ui-react'
import styles from './style.css';

class Runner extends Component {
  static propTypes = {
    runCrawler: PropTypes.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      inputVisible: false,
      inputValue: '',
      validated: true
    };
  }

  clearInput = () => {
    this.input.focus();
    this.setState({ inputValue: '' });
  };

  showInput = () =>
    this.setState({ inputVisible: true }, () => this.input.focus());

  hideInput = () =>
    this.setState({ inputVisible: false, inputValue: '', validated: true });

  handleInputChange = (e) =>
    this.setState({ inputValue: e.target.value, validated: true});

  handleInputConfirm = () => {
    const {inputValue} = this.state;
    const {runCrawler} = this.props;

    if(inputValue === '')
      return this.setState({validated: false});

    runCrawler(inputValue);

    this.setState({
      inputVisible: false,
      inputValue: '',
    });
  };

  saveInputRef = input => this.input = input;

  render() {
    const { inputVisible, validated } = this.state;
    const suffix = this.state.inputValue
      ? <Icon type="close-circle" onClick={this.clearInput} />
      : null;
    const errMessage = <span style={{color:"red"}}>
      The field must be filled
    </span>;
    const inputProps = {
      ref: this.saveInputRef,
      type: "text",
      placeholder: "Search word",
      style: {width: '200px'},
      prefix: <Icon type="rocket" style={{ color: validated ? '#08c' : '#f04633' }} />,
      suffix: suffix,
      value: this.state.inputValue,
      onChange: this.handleInputChange,
      onPressEnter: this.handleInputConfirm,
    };

    return (
      <div>
        {inputVisible && (
          <span>
            <Popover content={errMessage} visible={!validated}>
              <Input {...inputProps}/>
            </Popover>
              <span>{' '}</span>
              <ButtonS.Group size={'mini'}>
                <ButtonS
                  size={'mini'} color={'blue'}
                  onClick={this.handleInputConfirm}>
                  Run
                </ButtonS>
                <ButtonS.Or size={'mini'} text='OR'/>
                <ButtonS size={'mini'} onClick={this.hideInput}>
                  Cancel
                </ButtonS>
              </ButtonS.Group>
          </span>
        )}
        {!inputVisible && (
          <Button type="dashed" onClick={this.showInput}>
            <Icon type="plus" /> New crawler
          </Button>
        )}
      </div>
    );
  }
}

export default Runner;