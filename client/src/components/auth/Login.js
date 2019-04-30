import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classes from '../../style.module.css';

class Login extends Component{
    constructor(){
        super();
        this.state={
            email: '',
            password: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        const loginUser = {
            email: this.state.email,
            password: this.state.password
        }

        console.log(loginUser);
       axios.post('/api/user/login',loginUser)
       .then(res=>{
           console.log(res.data);
           this.props.history.push('/dashboard')
       })
       .catch(err=>console.log(err));
    }
    render(){
        const tab = classes.tab + "active";
        return(
        <div className={classes.form}>

        <ul className={classes.tabgroup}>
          <li className={tab}><Link to ="/">Sign Up</Link></li>
          <li className={tab}><Link to="">Log In</Link></li>
        </ul>
        
        <div className={classes.tabcontent}>
          <div id="login">   
          <h1>Welcome Back!</h1>
          
          <form onSubmit={this.onSubmit}>
          
           <div className={classes.fieldwrap}>
            <label>
              Email Address<span className="req">*</span>
            </label>
            <input type="email" name = "email" required
            onChange = {this.onChange}/>
           </div>
          
          <div className={classes.fieldwrap}>
            <label>
              Password<span className="req">*</span>
            </label>
            <input type="password" name="password" required 
            onChange = {this.onChange}/>
          </div>
          
          <button type="submit" className={classes.button}>Log In</button>
          
          </form>
          </div>
          
      </div>
  </div>
        )
    }
}

export default Login;