import logo from './logo.svg';
import './App.css';
import Account from './models/Account.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
async function getValData(){
  let response = await fetch('https://api.henrikdev.xyz/valorant/v1/mmr/na/TTV%20Glisby/gamer');
  let query = await response.json();
  return query.data;
}
function makeNewAccount(query){
  var account = new Account("itsFattyMatty", query.name, "Password", query.images.large , query.mmr_change_to_last_game);
}
export default App;
