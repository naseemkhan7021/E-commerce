import { BrowserRouter } from 'react-router-dom';
import Mainrouter from './MainRouter';
import './App.css';
import 'rc-slider/assets/index.css';
// import store from './redux/store';
// import { loadUserAction } from './redux/action/userAction';
// import { useEffect } from 'react';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>THIS IS MY APP</h1>
//       </header>
//     </div>
//   );
// }

const App = () => (
  // useEffect(() => {
  //   store.dispatch(loadUserAction())
  // }, []);

  // return (
  <BrowserRouter>
    <Mainrouter />
  </BrowserRouter>
  // )
)

export default App;
