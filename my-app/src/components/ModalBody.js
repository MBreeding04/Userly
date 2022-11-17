import './ModalBody.css';
import TextField from '@mui/material/TextField';

function ModalBody() {
    return(
        <div className='container'>
            <TextField required id="outlined-basic" label="username" variant="outlined" />
            <TextField required id="outlined-basic" label="tag" variant="outlined" />
            <TextField required id="outlined-basic" label="login" variant="outlined" />
            <TextField required id="outlined-basic" label="password" variant="outlined" />
        </div>
    )
}

export default ModalBody;