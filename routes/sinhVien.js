let express = require("express");
let sinhvien = require("../models/sinhvien");
let mongojs = require("mongojs");
let database = require("../config/db");
/**** KHAI BAO ROUTER() **/
let router = express.Router();

/*** KET NOI DATABASE MLAB ONLINE **/
var db = mongojs(database.database,['sinhvien']);
// GET API DANH SACH SINH VIEN
router.get("/gets",(req,res) =>{
	// lay tat ca du lieu
	db.sinhvien.find((err,docs)=>{
		if(err){
			res.send(err);
		}
		// CHUYEN THANH JSON
		res.json(docs);
	});
});
// GET API sinhvien VIA KEYWORD FROM SEARCH NAME
router.get("/search/:name",function(req,res,next){
	ten = req.params.name;
	// FIND sinhvien VIA NAME
	db.sinhvien.find({hoTen: new RegExp(ten, "i")},function(err,docs){
		if(err){
			res.json({success: false,msg:'Not sinhvien'});
		}else{
			// Check exits sinhvien
			if(docs.length != 0){
				res.json({success: true,docs});
				// Update sinhvien
			}else{
				// NON EXITS
				res.json({success: false,msg:'Not sinhvien'});
			}
		}
	});
});
// GET API THEO SINH VIEN THEO MSCB
router.get("/get/:mssv",(req,res)=>{
	let mssv = req.params.mssv;
	db.sinhvien.find({MSSV: mssv},(err,docs)=>{
		if(err){
			res.json({success: false,msg:'Not sinhvien'});
		}else{
			// Check exits SINH VIEN
			if(docs.length != 0){
				res.json(docs);
			}else{
				// NON EXITS
				res.json({success: false,msg:'Not sinhvien'});
			}
		}
	});
});
// POST API THEM 1 SINH VIEN
router.post("/post",(req,res)=>{
	// lay du lieu tu form
	// chuyen tai 1 json SINH VIEN moi
	let newsinhvien = new sinhvien({
		"rfid" : req.body.rfid,
		"MSSV" : req.body.MSSV,
		"hoTen": req.body.hoTen,
		"lop": req.body.lop,
		"nganh": req.body.nganh,
		"tenKhoa":req.body.tenKhoa,
		"Khoa":req.body.Khoa
	});
	// Gui va luu du lieu den mlab 
	// kiem tra mscb co trung hay khong
	// neu trung thi thong bao den ng dung 
	// con khong thi them vao csdl
	db.sinhvien.count({MSSV: newsinhvien.MSSV},(err,count)=>{
		if(err){
			throw err;
		}else{
			if(count === 0){
				// them du lieu vao csdl
				db.sinhvien.save(newsinhvien,err =>{
					if(err){
						res.json({success: false,msg:'ADD error'});
					}else{
						res.json({success: true,msg:'ADD success'});		
					}
				});
			}else{
				res.json({success: false,msg:"Exits"});
			}
		}
	});
});
// PUT API SUA THONG TIN SINH VIEN QUA ID
router.put("/put/:id",(req,res) =>{
	let id = req.params.id;
	// tao du lieu de sua
	let dataEdit ={
		"rfid" : req.body.rfid,
		"MSSV" : req.body.MSSV,
		"hoTen": req.body.hoTen,
		"lop": req.body.lop,
		"nganh": req.body.nganh,
		"tenKhoa":req.body.tenKhoa,
		"Khoa":req.body.Khoa
	};
	db.sinhvien.update({_id: mongojs.ObjectID(id)}, dataEdit, err=> {
		if(err){
			res.json({success: false,msg:'Not update product'});
		}else{
			// Check have exits products
			// Unless infrom or alert by json
			res.json({success: true,msg:'Update success'});
		}
	});
});
// DELETE API XOA SINH VIEN THONG QUA ID
router.delete("/delete/:id",(req,res)=>{
	id = req.params.id;
	//sinhvien mongodb online
	db.sinhvien.remove({_id: mongojs.ObjectID(id)},err =>{
		if(err ){
			res.json({success: false,msg:'Delete wrong'});
		}else{
			res.json({success: true,msg:'Delete success'});
		}
	});
});
module.exports = router;