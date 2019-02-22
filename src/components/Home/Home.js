import React, {Component} from 'react';
import logo from '../../assets/logotype-testio(black).png';
import logout from '../../assets/logout.png';
import Loader from '../Loader/Loader';
import axios from 'axios';
import './Home.scss';

class Home extends Component {
  state = {
    servers: [],
    loading: true,
  }

  async componentDidMount() {
    const token = localStorage.getItem('tesonet-token');
    if(token) {
      const res = await axios.get('https://tesonet-api.herokuapp.com/api/', {params: {
        token
        }});

      this.setState({servers: res.data, loading: false})
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
    const sortedServers = this.state.servers.sort((a, b) => {
      if (a.distance < b.distance) {
        return -1;
      } else if (a.distance > b.distance) {
        return 1;
      } else {
        return 0;
      }
      // console.log("B" + b.distance);
      // return a.distance < b.distance;
    })

    const serversList = sortedServers.map((server, i) => {
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
        {this.state.loading ? <Loader color='#b2b2b2' h={45}/> : serversList}
      </div>
    );
  }
}

export default Home;