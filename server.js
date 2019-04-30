const express =require('express');
const app=express();
const mongoose=require('mongoose');

const bodyParser=require('body-parser');
const user=require('./routes/api/user');
const passport=require('passport');
const post=require('./routes/api/post');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect('mongodb://pd:megadeth3@ds161074.mlab.com:61074/hack-dev',{
    useNewUrlParser: true
})
.then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

require('./config/passport')(passport);
app.use(passport.initialize());


app.use('/api/user',user);
app.use('/api/post',post);


port=process.env.PORT||5000;

app.listen(port,()=>{
    console.log(`server connected on the port at ${port}`);
})