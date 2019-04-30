import React, { Component } from 'react';
import classes from '../dash.module.css';
import axios from 'axios';

class Dashboard extends Component{
    constructor(){
        super();
        this.state={
            posts: [],
           loaded: false,
           dash: true,
           searchTerm: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        console.log("Searched "+this.state.searchTerm);

      this.props.history.push('/search');
    }
    componentDidMount(){
        axios.get('/api/post')
        .then(posts=>{
           const g = posts.data;
            const upPosts = g.map(gg=>{
                return{
                    ...gg
                }
            })
            this.setState({posts:upPosts,loaded:true});
            console.log(this.state.posts);
        })
        .catch(err=>console.log(err));
    }
    render(){
        const jumbo = "jumbotron" + classes.textcenter; 
        const box = "box " + classes.effect7;
        let dashShow = "";
            dashShow = (            <div>
                <div className={jumbo}>
      <h1>Protect Nature</h1> 
     <form onSubmit = {this.onSubmit}>
           <button type="submit" className="btn btn-danger">Search something!</button>
      </form>
    </div>
    {this.state.loaded?this.state.posts
    .map(post=>{
     return(
         <div className="card-deck">
           <div className="card"  style={{width: 18 + 'rem'}}>
      <div className="card-body">
        <h5 className="card-title">{post.name}</h5>
        <p className="card-text">{post.text}.</p>
        <p>{post.state}</p>
        <p>{post.city}</p>
      </div>
    </div>
         </div>
      
     )   
    }):null}
    <div id="about">
    <div className = {box}>
    <div className="col-md-4">
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
    </div>
    </div>
    </div>
    </div>
    </div>)
        
        return(
            <div>
            {dashShow}
            </div>
            
        )
    }
}

export default Dashboard;