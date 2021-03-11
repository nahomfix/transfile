import './App.css';
import FileSend from './FileSend';
import DownloadFile from './DownloadFile';
import NotFound from './NotFound';
import logo from './assets/transfileLogo.svg';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Row, Col } from 'antd';

function App(props) {
  console.log(props);

  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul className="navigation">
            <li><Link to="/"><img src={logo} alt="logo" height={20} style={{ margin: ' 15px 20px' }} /></Link></li>
          </ul>
        </nav>
        <Row className="main">
          <Col xs={24} sm={24} md={12} lg={12} xl={12} className="main__info">
            <div>
              <h2>Transfer Files</h2>
              <ul>
                <li>Free</li>
                <li>Fast</li>
                <li>No registration</li>
              </ul>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} className="main__file">
            <Switch>
              <Route exact path="/" component={FileSend}></Route>
              <Route path="/404" component={NotFound}></Route>
              <Route path="/:slug" component={DownloadFile}></Route>
            </Switch>
          </Col>
        </Row>
      </div>
    </BrowserRouter>
  );
}

export default App;
