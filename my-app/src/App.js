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
import {Account} from './models/Account.js';
import {useState} from 'react';
import ModalBody from './components/ModalBody';
import Button from "@mui/material/Button";
import Modal from '@mui/material/Modal';



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

  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ModalBody/>
        </Modal>
      </div>
    </ThemeProvider>
  );
}
export default App;
