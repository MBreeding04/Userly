import { TextField } from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function ShowAndHidePassword(data) {
    const [passwordType, setPasswordType] = useState("password");

    const [setPasswordInput] = useState("");
    var tempData = data.sendData;

    const handlePasswordChange = (evnt) => {
        setPasswordInput(evnt.target.value);
    }
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    const copyToClipboard = () =>{
        navigator.clipboard.writeText(tempData);
    }
    return (
        <div className="row">
            <div className="col-sm-3">
                <div className="input-group my-4 mx-4">
                    <TextField label="LoginName" type={passwordType} onChange={handlePasswordChange} value={tempData} name="password" className="form-control" />
                    <div className="input-group-btn">
                        <Button className="btn btn-outline-primary" onClick={togglePassword}>
                            {passwordType === "password" ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                        </Button>
                        <Button onClick={copyToClipboard}><ContentCopyIcon/></Button>
                    </div>
                </div>

            </div>
        </div>

    )
}
export default ShowAndHidePassword;