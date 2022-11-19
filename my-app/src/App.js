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
import { Account } from './models/Account.js';
import { useState, useRef, useEffect } from 'react';
import ModalBody from './components/ModalBody';
import Button from "@mui/material/Button";
import Modal from '@mui/material/Modal';
import React from 'react';
import ShowAndHidePassword from './components/ShowAndHidePassword';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rows, setRows] = useState([]);
  const firstRender = useRef(true);
  var tempLogin = '';
  var tempPassword = '';

  useEffect(() => {
  if (firstRender.current) {
    fillTableData();
    firstRender.current = false;
  }

  })
  
  
  async function fillTableData() {
    var api = '';
    if (localStorage.getItem("accounts") === null) {
      let temp = new Account("N/A", "N/A", "N/A", "N/A", "N/A", "N/A")
      setRows(rows => [...rows, temp]);
    }
    else {
      let accounts = localStorage.getItem("accounts");
      accounts = JSON.parse(accounts);
      const amountOfArraysOfData = accounts.length;
      for (let i = 0; i < amountOfArraysOfData; i++) {
        const userName = accounts[i].userName;
        const userTag = accounts[i].userTag;
        try {
          await fetch(`https://api.henrikdev.xyz/valorant/v1/mmr/na/${userName.toString()}/${userTag.toString()}`).then(
            (res) => res.json()).then((res) => api = res);
          const loginName = accounts[i].loginName.toString();
          const password = accounts[i].password.toString();
          const image = api.data.images.small.toString();
          var gainLoss = api.data.mmr_change_to_last_game.toString();
          if (gainLoss > 0) {
            gainLoss = '+' + gainLoss;
          }
          
          let temp = new Account(userName, userTag, loginName, password, image, gainLoss);
          setRows(rows => [...rows, temp])
        }
        catch {
          console.log("the api failed again");
        }
      }
    }
  };


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
                  <TableCell>User Name</TableCell>
                  <TableCell>Login Name</TableCell>
                  <TableCell>Password</TableCell>
                  <TableCell>Rank</TableCell>
                  <TableCell>Last Match Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  tempLogin = row.loginName,
                  tempPassword = row.password,
                  <TableRow
                    key={row.accountName}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.accountName}
                    </TableCell>
                    <TableCell>
                      {row.userName}
                    </TableCell>
                    <TableCell>
                      <div className="table-username">
                      <ShowAndHidePassword sendData={tempLogin}></ShowAndHidePassword>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="table-username">
                      <ShowAndHidePassword sendData={tempPassword}></ShowAndHidePassword>
                      </div>
                    </TableCell>
                    <TableCell><img
                      src={row.image}
                      alt="Rank"
                    /></TableCell>
                    <TableCell>{row.gainLoss}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ModalBody />
        </Modal>
      </div>
    </ThemeProvider>
  );
}
export default App;
