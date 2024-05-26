import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib";
import React, { ReactNode } from "react";

interface State {
  count: number;
}

class TabSwitchCounter extends StreamlitComponentBase<State> {
  public state = { count: 0 };

  // Define the event handler with a proper type for the event parameter
  private handleTabSwitch = (event: Event) => {
    if (document.hidden) {
      alert("탭이 전환됐습니다. 실수로 전환이 됐으면 조교님께 알리세요. 탭 전환 수가 기록됩니다.");
      this.setState(
        (prevState) => ({ count: prevState.count + 1 }),
        () => {
          Streamlit.setComponentValue(this.state.count);
        }
      );
    }
  };

  componentDidMount() {
    // Add the event listener when the component mounts
    document.addEventListener("visibilitychange", this.handleTabSwitch);
  }

  componentWillUnmount() {
    // Remove the event listener when the component unmounts
    document.removeEventListener("visibilitychange", this.handleTabSwitch);
  }

  public render = (): ReactNode => {
    return (
      <div>
        <p>Tab Switch Count: {this.state.count}</p>
      </div>
    );
  };
}

export default withStreamlitConnection(TabSwitchCounter);
