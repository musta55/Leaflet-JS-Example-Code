const path = require('path');
const express = require('express'); 

const app = express(); 
// const __dirname = "public";
 

// Serve the index.html file from the public folder 

// app.use(express.static('public')); 
app.use(express.static(__dirname + "/public"))
 
app.listen(3002, () => { 

    console.log('Server listening on port 3002'); 

});


  app.use(express.static(__dirname));

app.get("/verify/0xc783b6913d8605d7f756035de781c1053be042f0b7b6dc7de12c227d1900173b", (req, res) => {
    // res.setHeader('content-type', 'text/html');
    res.sendFile(path.join(__dirname, 'public/verify.html'));
  console.log("Hello");
});