import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Account from './models/Account.js';
import Icon from "@mui/material/Icon";
import { useEffect, useState } from 'react';
import axios from 'axios';

function createValAccountObject(accountName, username, password, image, gainLoss) {
  return { accountName, username, password, image, gainLoss };
};

const rows = [
  createValAccountObject('test#1223', 'Sample name', "sample password", "sample image", "sample gain"), // Returns an Object for the account
  createValAccountObject('test#1423', 'Sample name', "sample password", "sample image", "sample gain"),
  createValAccountObject('test#1523', 'Sample name', "sample password", "sample image", "sample gain"),
  createValAccountObject('test#16223', 'Sample name', "sample password", "sample image", "sample gain"),
  createValAccountObject('test#1123', 'Sample name', "sample password", "sample image", "sample gain"),
];

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);

  const getValAccounts = () => {
    setLoading(true);
    console.log(JSON.parse(process.env.REACT_APP_USER_INFO));
    let parsedAccounts = JSON.parse(process.env.REACT_APP_USER_INFO);
    let query = parsedAccounts.map(account => {
        return fetch(`https://api.henrikdev.xyz/valorant/v1/mmr/na/${account.userName}/${account.userTag}`);
      });

    Promise.all(query)
      .then(body => {
        return Promise.all(body.map((res) => {
          return res.json()
        }))
      })
      .then(res => {
        res.forEach((account) => {
          makeNewAccount(account.data)
        })
        setLoading(false);
      })
  };

  const makeNewAccount = (newAccount) => {
    let account = new Account(newAccount.data.loginName, newAccount.data.password, newAccount.data.userName, newAccount.data.tag, newAccount.data.image, newAccount.data.gainLoss);
    console.log("hit")
    setAccounts(accounts => [...accounts, account])
  }

  useEffect(() => {
    getValAccounts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className='Container'>
        <div className="Table-Container">
        <TableContainer sx={{ width: '65%' }} component={Paper}>
          <Table aria-label="valorant-account-tables">
            <TableHead>
              <TableRow>
                <TableCell>{process.env.REACT_APP_USER_INFO}</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Rank</TableCell>
                <TableCell>Last Match Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.accountName}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.accountName}
                  </TableCell>
                  <TableCell>
                    <div className="table-username">
                      {row.username} 
                      <VisibilityIcon /> 
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="table-username">
                      {row.password} 
                      <VisibilityIcon /> 
                    </div>
                  </TableCell>
                  <TableCell>{row.image}</TableCell>
                  <TableCell>{row.gainLoss}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      </div>
    </ThemeProvider>
  );
}

function makeNewAccount(query){
  var account = new Account("itsFattyMatty", query.name, "Password", query.images.large , query.mmr_change_to_last_game);
}
export default App;
