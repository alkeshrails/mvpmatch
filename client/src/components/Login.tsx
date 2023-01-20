import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { LogIn } from "../Api/authApi";
import _ from 'lodash';

export function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<any>({})
    const [user, setUser] = useState<any>({})
    const naviate = useNavigate();

    //Login user
    const handleSubmit=async(event:any)=> {
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
            const response = await LogIn({mail: email, pass: password})
            if(response.status === 200) {
                localStorage.setItem('token', _.get(response,'data.token',''));
                if(response?.data?.data?.user?.userType === 'seller'){
                    naviate('/seller-Dashboard')
                }
                if(response?.data?.data?.user?.userType === 'buyer'){
                    naviate('/buyer-Dashboard')
                }
            }
        }
    }

    return(
        <div>
            <div className="col-md-6 col-md-offset-3 auth_box">
            <h2 className="box-title">Login</h2>
            <form name="form" className="auth_form" onSubmit={handleSubmit}>
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