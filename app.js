let express = require("express");
let cors = require("cors");
let logger = require("morgan");
let bodyParser = require("body-parser");
let xFrameOptions = require('x-frame-options');

// lay route de connect 
// api can bo
let canbo = require("./routes/canBo");
// api diemDanhRa
let diemdanhra = require("./routes/diemdanhra");
// api diemDanhVao
let diemdanhvao = require("./routes/diemdanhvao");
// api sinhVien
let sinhvien = require("./routes/sinhvien");
// api suKien
let sukien = require("./routes/sukien");
let app = express();

// LOCALHOST:3000
var port = 3000;
//CORS Middleware
app.use(cors());
//X-Frame-option
app.use(xFrameOptions());
//MORGAN middleware
app.use(logger());

//Body Parser Middleware
app.use(bodyParser.json());
/*** DIEU HUONG LINK API */
app.use("/api/canbo",canbo);
app.use("/api/diemdanhra",diemdanhra);
app.use("/api/diemdanhvao",diemdanhvao);
app.use("/api/sinhvien",sinhvien);
app.use("/api/sukien",sukien);
/*** PORT BUILD **/
app.listen(process.env.PORT || port, (req,res)=>{
	console.log("Connected");
});