import * as React from "react";
import PropTypes from "prop-types";

const styles = {
  fontSize: "14px",
  position: "absolute",
  left: "0",
  right: "0",
  marginTop: "20px",
  textAlign: "center",
};

class Delayed extends React.Component {
  state = {
    show: false,
  };
  componentDidMount() {
    this.timeout = window.setTimeout(() => {
      this.setState({ show: true });
    }, this.props.wait);
  }
  componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }
  render() {
    return this.state.show === true ? this.props.children : null;
  }
}

Delayed.defaultProps = {
  wait: 300,
};

Delayed.propTypes = {
  children: PropTypes.node.isRequired,
  wait: PropTypes.number,
};

export default class Loading extends React.Component {
  state = {
    content: this.props.text,
  };
  componentDidMount() {
    const { speed, text } = this.props;

    this.interval = window.setInterval(() => {
      this.state.content === text + "..."
        ? this.setState({ content: text })
        : this.setState(({ content }) => ({ content: content + "." }));
    }, speed);
  }
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  render() {
    return (
      <Delayed>
        <p style={styles}>{this.state.content}</p>
      </Delayed>
    );
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};

Loading.defaultProps = {
  text: "Loading",
  speed: 300,
};
