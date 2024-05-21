import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Carlist from './Carlist';
import Snackbar from '@mui/material/Snackbar';
type User = {
    username: string;
    password: string;
}
function Login() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    });
    const [isAuthenticated, setAuth] = useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }
    
    const handleLogin = () => {
        axios.post(import.meta.env.VITE_API_URL + "/login", user, { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                const jwtToken = res.headers.authorization;

                if (jwtToken !== null) {
                    sessionStorage.setItem("jwt", jwtToken);
                    setAuth(true);
                }

            })
            .catch(()=>setOpen(true));
    }
    const handleLogout = () => {
        setAuth(false);
        sessionStorage.setItem("jwt", "");
    }

    if (isAuthenticated) {
        return <Carlist logOut={handleLogout} />;
    }
    else {
        return (
            <Stack spacing={2} alignItems="center" mt={2}>
                <TextField name="username" label="Usernae" onChange={handleChange} />
                <TextField type="password" name="password" label="Password" onChange={handleChange} />
                <Button variant="outlined" color="primary" onClick={handleLogin}>
                    <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}
                        message="Login failed: Check your username and password." />
                    Login
                </Button>
            </Stack>
        );
    }

}
export default Login;
