import './ModalBody.css';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Account } from '../models/Account.js';
import { Box } from '@mui/system';


function ModalBody() {

    //references to store the value in each textField
    const userName = useState();
    const userTag = useState();
    const loginName = useState();
    const password = useState();
    var inputData = new Array();
    var api = useState();

    //function to package data in an array and send it to local storage
    async function getInputData() {
        try {
            inputData['userName'] = userName.current.value;
            inputData['userTag'] = userTag.current.value;
            inputData['loginName'] = loginName.current.value;
            inputData['password'] = password.current.value;

            //fetches data from the API
            await fetch(`https://api.henrikdev.xyz/valorant/v1/mmr/na/${inputData['userName'].toString()}/${inputData['userTag'].toString()}`).then(
                (res) => res.json()).then((res) => api = res);

            let amountOfArraysOfData = 0;
            //gets number of objects stored in local storage

            if (localStorage.getItem("accounts") === null) {
            }
            else {
                amountOfArraysOfData = localStorage.getItem("accounts");
                amountOfArraysOfData = JSON.parse(amountOfArraysOfData);
                amountOfArraysOfData = amountOfArraysOfData.length;
            }
            //stores the data in an object so we can store multiple objects of data i.e multiple accounts
            let accounts = new Account(inputData['userName'], inputData['userTag'], inputData['loginName'], inputData['password'], api.data.images.small.toString(), api.data.ranking_in_tier.toString());
            let array = [];
            let existingAccounts = [];
            if (amountOfArraysOfData > 0) {
                for (let i = 0; i < amountOfArraysOfData; i++) {
                    let temp = localStorage.getItem("accounts");
                    temp = JSON.parse(temp);
                    existingAccounts[i] = new Account(temp[i].userName, temp[i].userTag, temp[i].loginName, temp[i].password, temp[i].image, temp[i].gainLoss);
                    array.push(existingAccounts[i]);
                }
            }
            array.push(accounts);
            localStorage.setItem("accounts", JSON.stringify(array));
            window.location.reload(false);
        }
        catch {
            console.log("jacob the api failed again...");
        }
    };
    return (
        <Box sx={{
            bgcolor: 'background.paper',
            boxShadow: 2,
            borderRadius: 4,
            minWidth: 2,
            flex: "flex",
            height: "8.5%",
            width: "64%",
            alignContent: 'center',
            alignItems:'center',
            ml: "17.5%",
            mt: "20%"

        }
        }>
            <div className='container'>

                <div id='error'></div>
                <div className='input'>
                    <TextField className="input" required id="outlined-basic" label="UserName" variant="outlined" inputRef={userName} />
                </div>
                <div className='input'>
                    <TextField className="input" required id="outlined-basic" label="Tag-Line" variant="outlined" inputRef={userTag} />
                </div>
                <div className='input'>
                    <TextField className="input" required id="outlined-basic" label="Login Name" variant="outlined" inputRef={loginName} />
                </div>
                <div className='input'>
                    <TextField className="input" required id="outlined-basic" label="Password" variant="outlined" inputRef={password} />
                </div>
                <div className='submit'>
                    <Button color="success" className="input" variant="contained" required id="Submit" onClick={getInputData}>Submit</Button>
                </div>

            </div>
        </Box >
    )
}

export default ModalBody;