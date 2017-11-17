import React, { Component } from 'react';

class AddPlayerForm extends Component {

  constructor(props) {
    super();
    this.state = {
      name: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.name !== '') {
      this.props.addNewPlayer(this.state.name);
      this.setState({
        name: ''
      });
    }
  }

  render() {
    return (
      <div className="form-wrapper wrapper">
        <form onSubmit={this.handleSubmit} >
          <label>
            <p className="label-name">Enter players name below!</p>
            <input
              className="input-box"
              type="text"
              value={this.state.name}
              onChange={this.handleChange} />
          </label>
          <br />
          <input className="btn"
            type="submit"
            value="ADD PLAYER" />
        </form>
        <input className="btn"
            type="submit"
            value="Deal!!"
            onClick={() => {this.props.deal()}}/>
      </div>
    );
  }

}

export default AddPlayerForm;
