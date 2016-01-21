var React = require('react');
var ReactDOM = require('react-dom');

var Container = React.createClass({
  render: function () {
    return (
      <Wrapper>
        <Welcome name={'Tyler'}/>
        <Hello />
      </Wrapper>
    )
  }
});

var Wrapper = React.createClass({
  render: function () {
    return (
      <div style={{backgroundColor: 'pink'}}>
        <h1> Header! </h1>
        {this.props.children}
      </div>
    )
  }
});

var Welcome = React.createClass({
  render: function () {
    return <div>Welcome {this.props.name}!</div>
  }
});

var Hello = React.createClass({
  render: function () {
    return <div>Hello ReactJS Program!</div>
  }
})

ReactDOM.render(<Container />, document.getElementById('app'));