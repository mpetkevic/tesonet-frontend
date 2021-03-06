import React, {Component} from 'react';
import logo from '../../assets/logotype-testio.png';
import user from '../../assets/user.svg';
import axios from 'axios';
import Loader from '../Loader/Loader';
import './Login.scss';

class Login extends Component {
  state = {
    username: '',
    password: '',
    loading: false
  }

  onInputChange = e => this.setState({[e.target.name]: e.target.value})

  onFormSubmit = async e => {
    e.preventDefault();
    this.setState({loading: true})
    const res = await axios.post('https://tesonet-api.herokuapp.com/api/', this.state);
    console.log(res.data);
    if(res.data) {
      localStorage.setItem('tesonet-token', res.data.token);
      this.props.history.push('/');
    }
    // this.props.history.push('/');
  }


  render() {
    return (
      <div className='Login'>
        <img src={logo} alt="logo"/>
        <form onSubmit={this.onFormSubmit}>
          <div className="input">
            <label htmlFor="username">
              <img className="input-img" src={user} alt=""/>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.onInputChange}
            />
          </div><div className="input">
            <label htmlFor="password">
              <img className="input-img" src={user} alt=""/>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onInputChange}
            />
          </div>
          <button type="submit">
            {this.state.loading ? <Loader color='#fff' h={15}/> : "Log In"}
          </button>
        </form>
      </div>
    );
  }
}

export default Login;