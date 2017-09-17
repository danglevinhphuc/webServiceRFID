let express = require("express");
let sukien = require("../models/sukien");
let mongojs = require("mongojs");
let database = require("../config/db");
/**** KHAI BAO ROUTER() **/
let router = express.Router();

/*** KET NOI DATABASE MLAB ONLINE **/
var db = mongojs(database.database,['sukien']);
// GET API DANH SACH CAN BO
router.get("/gets",(req,res) =>{
	// lay tat ca du lieu
	db.sukien.find((err,docs)=>{
		if(err){
			res.send(err);
		}
		// CHUYEN THANH JSON
		res.json(docs);
	});
});
// GET API sukien VIA KEYWORD FROM SEARCH NAME
router.get("/search/:name",function(req,res,next){
	ten = req.params.name;
	// FIND sukien VIA NAME
	db.sukien.find({tenSuKien: new RegExp(ten, "i")},function(err,docs){
		if(err){
			res.json({success: false,msg:'Not sukien'});
		}else{
			// Check exits sukien
			if(docs.length != 0){
				res.json({success: true,docs});
				// Update sukien
			}else{
				// NON EXITS
				res.json({success: false,msg:'Not sukien'});
			}
		}
	});
});
// POST API THEM 1 sukien
router.post("/post",(req,res)=>{
	// lay du lieu tu form
	// chuyen tai 1 json can bo moi
	let newDate = new Date(req.body.ngay);
	let newsukien = new sukien({
		"tenSuKien" : req.body.tenSuKien,
		"ngay" : newDate
	});
	// them du lieu vao csdl
	db.sukien.save(newsukien,err =>{
		if(err){
			res.json({success: false,msg:'ADD error'});
		}else{
			res.json({success: true,msg:'ADD success'});		
		}
	});
});
// PUT API SUA THONG TIN sukien QUA ID
router.put("/put/:id",(req,res) =>{
	let id = req.params.id;
	let newDate = new Date(req.body.ngay);
	// tao du lieu de sua
	let dataEdit ={
		"tenSuKien" : req.body.tenSuKien,
		"ngay" : newDate
	};
	console.log(dataEdit);
	db.sukien.update({_id: mongojs.ObjectID(id)}, dataEdit, err=> {
		if(err){
			res.json({success: false,msg:'Not update sukien'});
		}else{
			// Check have exits products
			// Unless infrom or alert by json
			res.json({success: true,msg:'Update success'});
		}
	});
});
// DELETE API XOA sukien THONG QUA ID
router.delete("/delete/:id",(req,res)=>{
	id = req.params.id;
	//sukien mongodb online
	db.sukien.remove({_id: mongojs.ObjectID(id)},err =>{
		if(err ){
			res.json({success: false,msg:'Delete wrong'});
		}else{
			res.json({success: true,msg:'Delete success'});
		}
	});
});
/*** HAM DUNG DE CHUYEN DOI NGAY THANG NAM **/
module.exports = router;