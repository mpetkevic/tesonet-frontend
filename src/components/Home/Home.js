import React, {Component} from 'react';
import logo from '../../assets/logotype-testio(black).png';
import logout from '../../assets/logout.png';
import axios from 'axios';
import './Home.scss';

class Home extends Component {
  state = {
    servers: []
  }

  async componentDidMount() {
    const token = localStorage.getItem('tesonet-token');
    if(token) {
      const res = await axios.get('https://playground.tesonet.lt/v1/servers', {
        headers: {'Authorization': token}
      });
      this.setState({servers: res.data})
    } else {
      this.props.history.push('/login');
    }
  }

  onLoguot = e => {
    e.preventDefault();
    localStorage.removeItem('tesonet-token');
    this.props.history.push('/login');
  }

  render() {
    const serversList = this.state.servers.map((server, i) => {
      return (
        <div key={i} className='server-list-item'>
          <span>{server.name}</span>
          <span>{server.distance}</span>
        </div>
      )});
    return (
      <div className="Home">
        <div className="header">
          <img className='logo' src={logo} alt=""/>
          <button onClick={this.onLoguot}>
            <img className='logout' src={logout} alt=""/>
            Logout
          </button>
        </div>
        <div className='server'>
          <span>Server</span>
          <span>Distance</span>
        </div>
        {serversList}
      </div>
    );
  }
}

export default Home;