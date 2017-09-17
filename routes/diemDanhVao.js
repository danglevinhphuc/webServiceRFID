let express = require("express");
let diemDanhVao = require("../models/diemdanhvao");
let mongojs = require("mongojs");
let database = require("../config/db");
/**** KHAI BAO ROUTER() **/
let router = express.Router();

/*** KET NOI DATABASE MLAB ONLINE **/
var db = mongojs(database.database,['diemdanhvao']);
// GET API DANH SACH CAN BO
router.get("/gets",(req,res) =>{
	// lay tat ca du lieu
	db.diemdanhvao.find((err,docs)=>{
		if(err){
			res.send(err);
		}
		// CHUYEN THANH JSON
		res.json(docs);
	});
});
// GET API diemdanhvao VIA KEYWORD FROM SEARCH NAME
router.get("/search/:name",function(req,res,next){
	ten = req.params.name;
	// FIND diemdanhvao VIA NAME
	db.diemdanhvao.find({hoTen: new RegExp(ten, "i")},function(err,docs){
		if(err){
			res.json({success: false,msg:'Not diemdanhra'});
		}else{
			// Check exits diemdanhvao
			if(docs.length != 0){
				res.json({success: true,docs});
				// Update diemdanhvao
			}else{
				// NON EXITS
				res.json({success: false,msg:'Not diemdanhvao'});
			}
		}
	});
});
// POST API THEM 1 diemdanhvao
router.post("/post",(req,res)=>{
	// lay du lieu tu form
	// chuyen tai 1 json can bo moi
	let newDiemDanhVao = new diemDanhVao({
		"rfid" : req.body.rfid,
		"MSSV" : req.body.MSSV,
		"MSCB" : req.body.MSCB
	});
	// them du lieu vao csdl
	db.diemdanhvao.save(newDiemDanhVao,err =>{
		if(err){
			res.json({success: false,msg:'ADD error'});
		}else{
			res.json({success: true,msg:'ADD success'});		
		}
	});
});
// PUT API SUA THONG TIN diemdanhvao QUA ID
router.put("/put/:id",(req,res) =>{
	let id = req.params.id;
	// tao du lieu de sua
	let dataEdit ={
		"rfid" : req.body.rfid,
		"MSSV" : req.body.mssv,
		"MSCB" : req.body.mscb
	};
	db.diemdanhvao.update({_id: mongojs.ObjectID(id)}, dataEdit, err=> {
		if(err){
			res.json({success: false,msg:'Not update diemdanhvao'});
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
	//diemdanhvao mongodb online
	db.diemdanhvao.remove({_id: mongojs.ObjectID(id)},err =>{
		if(err ){
			res.json({success: false,msg:'Delete wrong'});
		}else{
			res.json({success: true,msg:'Delete success'});
		}
	});
});
module.exports = router;