import './ModalBody.css';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import {useState} from 'react';


function ModalBody() {

    //references to store the value in each textField
    const userName = useState();
    const userTag = useState();
    const loginName = useState();
    const password = useState();
    var inputData = new Array();
    var api = '';
    
    //function to package data in an array and send it to local storage
    function getInputData(){
        inputData['userName'] = userName.current.value;
        inputData['userTag'] = userTag.current.value;
        inputData['loginName'] = loginName.current.value;
        inputData['password'] = password.current.value;
        localStorage.setItem("loginName",inputData['loginName'].toString());
        localStorage.setItem("password",inputData['password'].toString());
        fetch(`https://api.henrikdev.xyz/valorant/v1/mmr/na/${inputData['userName'].toString()}/${inputData['userTag'].toString()}`).then(
            (res) => console.log(res.json())).then((res) => api = res.json());
        //error happens data is not parsed correctly
    };
    return(
        <div className='container'>
            <TextField required id="outlined-basic" label="username" variant="outlined"  inputRef= {userName}/>
            <TextField required id="outlined-basic" label="tag" variant="outlined" inputRef= {userTag} />
            <TextField required id="outlined-basic" label="login" variant="outlined" inputRef= {loginName} />
            <TextField required id="outlined-basic" label="password" variant="outlined" inputRef= {password} />
            <Button variant="text" required id="Submit"onClick={getInputData}>Submit</Button>
            
        </div>
    )
}

export default ModalBody;