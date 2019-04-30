import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classes from '../../style.module.css';

class Signup extends Component{
    constructor(){
        super();
        this.state={
            name: '',
            password: '',
            email: ''
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
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
    }
    console.log(loginUser)
    axios.post('/api/user/register',loginUser)
    .then(res=>{
        console.log(res.data);
        this.props.history.push('/login');
    })
    .catch(err=>console.log(err));
  }
    render(){
      const tab = classes.tab + "active";
        return(
    <div className={classes.form}>
      
      <ul className={classes.tabgroup}>
        <li className={tab}><Link to ="">Sign Up</Link></li>
        <li className={tab}><Link to="/login">Log In</Link></li>
      </ul>
      
      <div className={classes.tabcontent}>
        <div id="signup">   
          <h1>Sign Up for Free</h1>
          <form onSubmit={this.onSubmit}>
          <div className={classes.fieldwrap}>
            <label>
              Name<span className="req">*</span>
            </label>
            <input type="text" name="name" required 
            onChange={this.onChange} />
          </div>

          <div className={classes.fieldwrap}>
            <label>
              Email Address<span className="req">*</span>
            </label>
            <input type="email" name="email" required  onChange={this.onChange}/>
          </div>
          
          <div className={classes.fieldwrap}>
            <label>
              Set A Password<span className="req">*</span>
            </label>
            <input type="password" name="password" required  onChange={this.onChange}/>
          </div>
          <button type="submit" className={classes.button}>Get Started</button>
          </form>

        </div>
        <div id="login">   
          
        </div>
        
    </div>
</div>
        )
    }
}

export default Signup;

