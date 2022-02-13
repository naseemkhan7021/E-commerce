import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';

import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import store from './redux/store';


const options = {
  timeout: 5000,
  position: positions.BOTTOM_RIGHT,
  transition: transitions.SCALE
}

ReactDOM.render(
  <Provider store={store} >
    <AlertProvider template={AlertTemplate} {...options} >
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);
