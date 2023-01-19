import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/user/user/duck/actions";

export function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<any>({})
    const dispatch = useDispatch();
    const { user } = useSelector((state:any) => state?.user)
    const naviate = useNavigate();

    const handleSubmit=(event:any)=> {
        event.preventDefault()
        const err: any = {}
        if (email === '' || email.trim() === '') {
          err.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
          err.email = 'Invalid email';
        }
        
        if (password === '' ) {
          err.password = 'Enter  Valid Password.'
        }
        setError(err);
        if (!Object.keys(err).length) {
            dispatch(userLogin({mail: email, pass: password}))
        }
    }

    return(
        <div>
            <div className="col-md-6 col-md-offset-3">
            <h2>Login</h2>
            <h2 className="error-block">{user?.loginMessage}</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className={'form-group'}>
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" name="email"  onChange={(e) => setEmail(e.target.value)}/>  
                    { error && error.email ?
                        <div className="error-block">{error.email}</div> : ''
                    } 
                </div>
                <div className={'form-group'}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password"  onChange={(e) => setPassword(e.target.value)}/> 
                    { error && error.password ?
                        <div className="error-block">{error.password}</div> : ''
                    } 
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Login</button>
                    <Link to="/register" className="btn btn-link">Register</Link>
                </div>
            </form>
        </div>
        </div>
    )
}