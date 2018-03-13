import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Alert, Popover, Progress, Timeline, Icon} from 'antd';

class CrawlerStatus extends Component {
  static propTypes = {
    crawler: PropTypes.object.isRequired,
    steps: PropTypes.array,
    selectedRow: PropTypes.string
  };

  render() {
    const text = this.props.crawler.status.toLowerCase();
    const steps = this.props.steps || [];
    const type = text === 'done' ? 'success' :
      (text === 'fail' ? 'error' :
        (text === 'in progress' ? 'info' : 'warning'));
    const condition = (text === 'in progress' &&
      (this.props.selectedRow || '') === this.props.crawler.id);

    const percentage = parseInt(
      steps.filter(step => step.done).length
      / steps.length  * 100
    );
    const alertMessage = condition ? <span>
      <Progress percent={percentage} size="small" status="active" />
    </span> : text;

    const status = <span><Alert
      style={{ 'minWidth': '130px' }} message={alertMessage}
      type={type} showIcon={!condition}
    /></span>;
    const todoIcon = <Icon
      type="check-circle"
      style={{ fontSize: '16px' }}
    />;
    const list = steps.filter(step => step.done).map(step => <Timeline.Item key={step.desc} dot={todoIcon}>
      {step.desc}
    </Timeline.Item>);
    const stepsList = <Timeline pending={steps.find(step => !step.done).desc}>
      {list}
    </Timeline>;

    return (text === 'in progress' ? <Popover
      trigger={'hover'} content={stepsList}
      title="In progress">
      {status}
    </Popover> : status);
  };
}

export default CrawlerStatus;