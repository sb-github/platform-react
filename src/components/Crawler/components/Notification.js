import React, {Component} from 'react';
import { Position, Toaster, Intent, Button } from "@blueprintjs/core";
import {  notification } from 'antd';

class Notification extends Component {

  toaster =null;

  refHandlers = {
    toaster: (ref) => this.toaster = ref,
  };

  render() {
    return(
      <div>
        <Button onClick={this.addToast} text="Procure toast" />
        <Toaster
          intent={Intent.SUCCESS}
          message={"Goodbye, old friend."}
          position={Position.TOP}
          ref={this.refHandlers.toaster}
        />
      </div>
    );
  }

  addToast = () => {
    const configure = {
      position: Position.LEFT,
      intent: Intent.SUCCESS,
      message: "Goodbye, old friend."
    }

    notification['success']({
      message: 'Notification Title',
      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });

    //this.toaster.show(configure);
  }
}

export default Notification;