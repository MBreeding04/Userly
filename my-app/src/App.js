import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
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
import Password from './components/Password';
import Login from './components/LoginName';
import { Typography } from '@mui/material';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  // setloading state is never used but may be implemented in the future
  const [editedAccount, seteditedAccount] = useState(new Account("", "", "", "", "", ""));
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true) ;
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

  function DeleteRow(id, reload) {
    var data = localStorage.getItem("accounts");
    data = JSON.parse(data);
    if (data.length === 1) {
      localStorage.removeItem("accounts");
    }
    else {
      var temp = data.splice(id, 1);
      let final = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].userName !== temp.userName) {
          const g = new Account(data[i].userName, data[i].userTag, data[i].loginName, data[i].password, data[i].image, data[i].gainLoss);
          final.push(g);
          localStorage.setItem("accounts", JSON.stringify(final));
        }
      }
    }
    if(reload === true){
      window.location.reload(false)
    }
  }
  function editRow(id) {
    var data = localStorage.getItem("accounts");
    data = JSON.parse(data);
    seteditedAccount(new Account(data[id].userName, data[id].userTag, data[id].loginName, data[id].password, data[id].image, data[id].gainLoss));
    handleOpen()
    DeleteRow(id, false)
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
          let temp = new Account(userName, userTag, loginName, password, image, "(Error)");
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
          <TableContainer sx={{ width: '65%' }} component={Paper} key={1000}>
            <div className='tableOfData'>
              <Table aria-label="valorant-account-tables">
                <TableBody key={1008}>
                  {rows.map((row) => (
                    indexRef++,
                    row.id = indexRef,
                    tempLogin = row.loginName,
                    tempPassword = row.password,
                    <TableRow
                      key={"p" + row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" key={row.id}>
                        {row.accountName}
                      </TableCell>
                      <TableCell key={"q" + row.id}>
                        <Typography sx={{fontSize: 30, fontWeight: 'bold'}}variant='h6'><div className='UserName'>{row.userName}</div></Typography>
                      </TableCell>
                      <TableCell sx={{width: 0.2}}key={"w" + row.id}>
                        <div className="table-loginPassword">
                          <Login sendData={tempLogin}></Login>
                        </div>
                      </TableCell>
                      <TableCell key={"e" + row.id}>
                        <div className="table-loginPassword">
                          <Password sendData={tempPassword}></Password>
                        </div>
                      </TableCell>
                      <TableCell key={"r" + row.id}><img className="rank" src={row.image} alt="Rank" /></TableCell>
                      <TableCell sx={{paddingLeft: 1}}key={"t" + row.id}> <Typography sx={{
                        color: "text.primary",
                        fontSize: 19,
                        fontWeight: 'bold'
                      }} variant='h6'><div className='gainLoss'>{row.gainLoss}rr</div></Typography></TableCell>
                      <TableCell key={"y" + row.id}>
                        <div className='deleteButton'>
                          <Button color="secondary" onClick={() => editRow(row.id)} variant="outlined" className='DeleteButton'>Edit</Button>
                        </div>
                      </TableCell>
                      <TableCell key={"y" + row.id}>
                        <div className='deleteButton'>
                          <Button color="error" onClick={() => DeleteRow(row.id, true)} variant="outlined" className='DeleteButton'>Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow key={4}></TableRow>
                </TableBody>
              </Table>
            </div>
            <div className='AddUser'>
              <Button sx={{
                ml: "13%",
                my: "1%",
                width: "75%",
                borderRadius: 25
              }} onClick={handleOpen} variant="outlined" color='success'>Add User</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignContent:'center', alignItems:'center'}}
              >
                  <ModalBody userName={editedAccount.userName} userTag={editedAccount.userTag} loginName={editedAccount.loginName} password={editedAccount.password}/>
              </Modal>
            </div>
          </TableContainer>
        </div >
      </div>
    </ThemeProvider >
  );
}
export default App;
