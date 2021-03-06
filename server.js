const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000

let app = express();

hbs.registerPartials(__dirname +  '/views/partials');
app.set('view engine', 'hbs');

//helper functions 
hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
})


// middle ware
app.use((req, res, next)=> {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.path} this is a log`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

//app.use((req, res , next) =>{
//  res.render('maintenance.hbs')
//});


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{  
 res.render('home.hbs', {
   pageTitle: 'Welcome to te jungle',
   welcome: 'Node Project Home'

 });
});

app.get('/projects', (req, res)=>{
 res.render('projects.hbs');
});

app.get('/about',(req, res)=>{
  //res.send('about page');
  res.render('about.hbs',{
    pageTitle:'About Page',
  });
});

app.get('/bad', (req, res) =>{
  res.send({
    errorMessage: 'rout not found'
  });
});

app.listen(port, ()=>{
  console.log(`Server is up running on port ${port}`)
});