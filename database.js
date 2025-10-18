const mongoose=require('mongoose');
const URI='mongodb://localhost:27017/usuarios_db';
mongoose.connect(URI)
.then(db=> console.log('BD conectada'))
.catch(err => console.log(err));

module.exports=mongoose;