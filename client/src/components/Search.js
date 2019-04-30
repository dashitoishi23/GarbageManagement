import React, { Component } from 'react'
import axios from 'axios';
import classes from '../dash.module.css';

export default class Search extends Component {
  constructor(){
      super();
      this.state = {
          state: '',
          city: '',
          text: '',
          name: '',
        loaded: false,
        search: ''
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }
  onSubmit(e){
      e.preventDefault();
      const search = {
        city: this.state.search
      }
      axios.post('/api/post/search',search)
      .then(res=>{
          this.setState({loaded: true,state: res.state,city:res.city,text:res.text,name:res.name});
          console.log(res);
      })
      .catch(err=>console.log(err));
  }
  render() {
    return (
      <div>
          <form onSubmit={this.onSubmit}>
          <div className={classes.inputgroup}>
          <input type="text" name = "search"  placeholder="CITY" required  onChange = {this.onChange} />
          <div>
          <button type="submit" className="btn btn-danger">Submit</button>
          </div>
          </div>
          </form>
          <h1 style={{textAlign: "center"}}>Search results are as follows:-</h1>
        {this.state.loaded?<div class="card-deck">
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">{this.state.name}</h5>
      <p className="card-text">{this.state.text}</p>
      <p className="card-text"><small className="text-muted">{this.state.state}</small></p>
    </div>
  </div>
  </div>:null}
      </div>
    )
  }
}
