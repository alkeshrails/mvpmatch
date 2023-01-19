import React, { useState } from 'react';
import { Link } from 'react-router-dom'

export function Register() {
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<any>({})

    const handleSubmit=(event:any)=> {
        console.log(email, password)
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
        setError(err);
        if (!Object.keys(err).length) {
            
        }
    }
    return(
        <div className="col-md-6 col-md-offset-3">
        <h2>User Register</h2>
        <form  name="form">
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
        <div className="form-group">
            <button type="submit" className="btn btn-primary">Register</button>
            <Link to="/login" className="btn btn-link">Cancel</Link>
        </div>                     
        </form>
    </div>
    )
}