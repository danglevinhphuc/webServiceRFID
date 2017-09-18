let express = require("express");
let cors = require("cors");
let logger = require("morgan");
let bodyParser = require("body-parser");
let xFrameOptions = require('x-frame-options');

// lay route de connect 
// api can bo
let canbo = require("./routes/canBo");
// api diemDanhRa
let diemdanhra = require("./routes/diemDanhRa");
// api diemDanhVao
let diemdanhvao = require("./routes/diemDanhVao");
// api sinhVien
let sinhvien = require("./routes/sinhVien");
// api suKien
let sukien = require("./routes/suKien");
// api danhSach tham gia su kien co vang hoac khong vang
let danhsach = require("./routes/danhSach");
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
app.use("/api/danhsach",danhsach);
// 404
app.use("*",(req,res)=>{
	res.send("welcome to web service RFID");
});
/*** PORT BUILD **/
app.listen(process.env.PORT || port, (req,res)=>{
	console.log("connected");
});
