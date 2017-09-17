let express = require("express");
let diemDanhRa = require("../models/diemdanhra");
let mongojs = require("mongojs");
let database = require("../config/db");
/**** KHAI BAO ROUTER() **/
let router = express.Router();

/*** KET NOI DATABASE MLAB ONLINE **/
var db = mongojs(database.database,['diemdanhra']);
// GET API DANH SACH CAN BO
router.get("/gets",(req,res) =>{
	// lay tat ca du lieu
	db.diemdanhra.find((err,docs)=>{
		if(err){
			res.send(err);
		}
		// CHUYEN THANH JSON
		res.json(docs);
	});
});
// GET API diemdanhra VIA KEYWORD FROM SEARCH NAME
router.get("/search/:name",function(req,res,next){
	ten = req.params.name;
	// FIND diemdanhra VIA NAME
	db.diemdanhra.find({hoTen: new RegExp(ten, "i")},function(err,docs){
		if(err){
			res.json({success: false,msg:'Not diemdanhra'});
		}else{
			// Check exits diemdanhra
			if(docs.length != 0){
				res.json({success: true,docs});
				// Update diemdanhra
			}else{
				// NON EXITS
				res.json({success: false,msg:'Not diemdanhra'});
			}
		}
	});
});
// POST API THEM 1 DIEMDANHRA
router.post("/post",(req,res)=>{
	// lay du lieu tu form
	// chuyen tai 1 json can bo moi
	let newDiemDanhRa = new diemDanhRa({
		"rfid" : req.body.rfid,
		"MSSV" : req.body.MSSV,
		"MSCB" : req.body.MSCB,
		"hoTen": req.body.hoTen
	});
	// them du lieu vao csdl
	db.diemdanhra.save(newDiemDanhRa,err =>{
		if(err){
			res.json({success: false,msg:'ADD error'});
		}else{
			res.json({success: true,msg:'ADD success'});		
		}
	});
});
// PUT API SUA THONG TIN DIEMDANHRA QUA ID
router.put("/put/:id",(req,res) =>{
	let id = req.params.id;
	// tao du lieu de sua
	let dataEdit ={
		"rfid" : req.body.rfid,
		"MSSV" : req.body.mssv,
		"MSCB" : req.body.mscb,
		"hoTen": req.body.hoten
	};
	db.diemdanhra.update({_id: mongojs.ObjectID(id)}, dataEdit, err=> {
		if(err){
			res.json({success: false,msg:'Not update diemdanhra'});
		}else{
			// Check have exits products
			// Unless infrom or alert by json
			res.json({success: true,msg:'Update success'});
		}
	});
});
// DELETE API XOA DIEMDANHRA THONG QUA ID
router.delete("/delete/:id",(req,res)=>{
	id = req.params.id;
	//diemdanhra mongodb online
	db.diemdanhra.remove({_id: mongojs.ObjectID(id)},err =>{
		if(err ){
			res.json({success: false,msg:'Delete wrong'});
		}else{
			res.json({success: true,msg:'Delete success'});
		}
	});
});
module.exports = router;