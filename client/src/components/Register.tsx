import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from "../Api/authApi";

export function Register() {

    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [userType, setUserType] = useState<string>('');
    const [error, setError] = useState<any>({})
    const naviate = useNavigate();


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
        if(userName === '') {
            err.userName = 'Enter valid name'
        }
        if(userType === '') {
            err.userType = 'Select user type'
        }
        setError(err);
        if (!Object.keys(err).length) {
            const response = await signUp({name: userName, pass: password, mail: email, userType: userType})
            if (response.status === 200) {
                naviate('/login')
            }
        }
    }

    return(
        <div className="col-md-6 col-md-offset-3 auth_box">
        <h2 className="box-title">User Register</h2>
        <form className="auth_form" name="form" onSubmit={handleSubmit}>
        <div className={'form-group'}>
            <label htmlFor="userName">Username</label>
            <input type="text" className="form-control" name="userName"  onChange={(e) => setUserName(e.target.value)}/>
            { error && error.userName ?
                <div className="error-block">{error.userName}</div> : ''
            } 
        </div>
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
        <div className={'form-group'}>
            <label htmlFor="password">User Type</label>
            <select name="userType" id="userType" onChange={(e)=>setUserType(e.target.value)}>
                <option value="">Select user type</option>
                <option value="seller">Seller</option>
                <option value="buyer">Buyer</option>
            </select>
            { error && error.userType ?
                <div className="error-block">{error.userType}</div> : ''
            } 
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-primary">Register</button>
            <Link to="/login" className="btn btn-link">Cancel</Link>
        </div>                     
        </form>
    </div>
    )
}