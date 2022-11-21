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
import { Typography } from '@mui/material';

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
  var indexRef = -1;

  useEffect(() => {
    if (firstRender.current) {
      fillTableData();
      firstRender.current = false;
    }

  })
  function DeleteRow(id) {
    var data = localStorage.getItem("accounts");
    data = JSON.parse(data);
    var temp = data.splice(id, 1);
    let final = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].userName === temp.userName) {

      }
      else {
        const g = new Account(data[i].userName, data[i].userTag, data[i].loginName, data[i].password, data[i].image, data[i].gainLoss);
        final.push(g);
        localStorage.setItem("accounts", JSON.stringify(final));
      }
    }
    window.location.reload(false);
  }


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
          var gainLoss = api.data.ranking_in_tier.toString();

          let temp = new Account(userName, userTag, loginName, password, image, gainLoss);
          setRows(rows => [...rows, temp])
        }
        catch {
          const userName = accounts[i].userName;
          const userTag = accounts[i].userTag;
          const loginName = accounts[i].loginName.toString();
          const password = accounts[i].password.toString();
          const image = accounts[i].image;
          let temp = new Account(userName, userTag, loginName, password, image, "error retreiving current data");
          setRows(rows => [...rows, temp]);
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
            <div className='tableOfData'>
              <Table aria-label="valorant-account-tables">
                <TableHead>
                  <TableRow key={indexRef}>
                    <TableCell>{process.env.REACT_APP_USER_INFO}</TableCell>
                    <TableCell><Typography variant='h6'>User Name</Typography></TableCell>
                    <TableCell><Typography variant='h6'>Login Name</Typography></TableCell>
                    <TableCell><Typography variant='h6'>Password</Typography></TableCell>
                    <TableCell><Typography variant='h6'>Rank</Typography></TableCell>
                    <TableCell><Typography variant='h6'>RR In Rank</Typography></TableCell>
                    <TableCell><Typography variant='h6'><div className="deleteLabel">Delete</div></Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    indexRef++,
                    row.id = indexRef,
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
                        <Typography variant='h6'>{row.userName}</Typography>
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
                      <TableCell><img className="rank" src={row.image} alt="Rank" /></TableCell>
                      <TableCell> <Typography sx={{
                        color:"text.primary"
                      }} variant='h6'><div className='gainLoss'>{row.gainLoss}</div></Typography></TableCell>
                      <TableCell>
                        <div className='deleteButton'>
                          <Button color="error" onClick={() => DeleteRow(row.id)} variant="outlined" className='DeleteButton'>Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>

                  ))}
                  <TableRow></TableRow>
                </TableBody>

              </Table>
            </div>
            <div className='AddUser'>
              <Button sx={{
                ml: 70,
                my: 2,
                borderRadius: 25
              }} onClick={handleOpen} variant="outlined" color='success'>Add User</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <ModalBody />
              </Modal>
            </div>
          </TableContainer>
        </div >
      </div>
    </ThemeProvider>

  );
}
export default App;
