import React from 'react';
import Grid from "@mui/material/Grid";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from "../../State/Auth/Action";

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
        
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get("email"),
            password: data.get("password")
        }
        dispatch(login(userData))
        console.log(userData)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>

                    <Grid item xs={12}>
                        <TextField
                            required
                            id='email'
                            name='email'
                            label='Email'
                            type='email'
                            fullWidth
                            autoComplete='email'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id='password'
                            name='password'
                            label='password'
                            type='Password'
                            fullWidth
                            autoComplete='password'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button className=' w-full ' type='submit' variant='contained' size='large'
                                sx={{padding: ".8rem 0", background: '#9155FD'}}>
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <div className='flex justify-center flex-col items-center'>
                <div className='py-3 flex items-center'>
                    <p>
                        If you don't have account ?
                    </p>
                    <Button onClick={() => navigate("/register")} className="ml-5 " size='small'>Register</Button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
