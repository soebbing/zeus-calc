/** @jsx React.DOM */
var UpdateText = React.createClass({
  getInitialState: function(){
    return {name: ''}
  },
  change: function(e){
    this.setState({name: e.target.value})
  },
  render: function(){
    return (
      <div>
        <input type="text" name="name" onChange={this.change} />
        <h1> Hello {this.state.name}!!!</h1>
      </div>
    )
  }
});

