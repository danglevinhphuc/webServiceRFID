let express = require("express");
let canBo = require("../models/canbo");
let mongojs = require("mongojs");
let database = require("../config/db");
/**** KHAI BAO ROUTER() **/
let router = express.Router();

/*** KET NOI DATABASE MLAB ONLINE **/
var db = mongojs(database.database,['canbo']);
// GET API DANH SACH CAN BO
router.get("/gets",(req,res) =>{
	// lay tat ca du lieu
	db.canbo.find((err,docs)=>{
		if(err){
			res.send(err);
		}
		// CHUYEN THANH JSON
		res.json(docs);
	});
});
// GET API CANBO VIA KEYWORD FROM SEARCH NAME
router.get("/search/:name",function(req,res,next){
	ten = req.params.name;
	// FIND CANBO VIA NAME
	db.canbo.find({hoTen: new RegExp(ten, "i")},function(err,docs){
		if(err){
			res.json({success: false,msg:'Not CanBo'});
		}else{
			// Check exits CanBo
			if(docs.length != 0){
				res.json({success: true,docs});
				// Update CanBo
			}else{
				// NON EXITS
				res.json({success: false,msg:'Not CanBo'});
			}
		}
	});
});
// GET API THEO CAN BO THEO MSCB
router.get("/get/:mscb",(req,res)=>{
	let mscb = req.params.mscb;
	db.canbo.find({MSCB: mscb},(err,docs)=>{
		if(err){
			res.json({success: false,msg:'Not CanBo'});
		}else{
			// Check exits can bo
			if(docs.length != 0){
				res.json(docs);
			}else{
				// NON EXITS
				res.json({success: false,msg:'Not CanBo'});
			}
		}
	});
});
// POST API THEM 1 CAN BO
router.post("/post",(req,res)=>{
	// lay du lieu tu form
	// chuyen tai 1 json can bo moi
	let newCanBo = new canBo({
		"rfid" : req.body.rfid,
		"MSCB" : req.body.MSCB,
		"hoTen": req.body.hoTen,
		"email": req.body.email,
		"donVi": req.body.donVi
	});
	// Gui va luu du lieu den mlab 
	// kiem tra mscb co trung hay khong
	// neu trung thi thong bao den ng dung 
	// con khong thi them vao csdl
	db.canbo.count({MSCB: newCanBo.MSCB},(err,count)=>{
		if(err){
			throw err;
		}else{
			if(count === 0){
				// them du lieu vao csdl
				db.canbo.save(newCanBo,err =>{
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
// PUT API SUA THONG TIN CAN BO QUA ID
router.put("/put/:id",(req,res) =>{
	let id = req.params.id;
	// tao du lieu de sua
	let dataEdit ={
		"rfid" : req.body.rfid,
		"MSCB" : req.body.MSCB,
		"hoTen": req.body.hoTen,
		"email": req.body.email,
		"donVi": req.body.donVi
	};
	db.canbo.update({_id: mongojs.ObjectID(id)}, dataEdit, err=> {
		if(err){
			res.json({success: false,msg:'Not update product'});
		}else{
			// Check have exits products
			// Unless infrom or alert by json
			res.json({success: true,msg:'Update success'});
		}
	});
});
// DELETE API XOA CAN BO THONG QUA ID
router.delete("/delete/:id",(req,res)=>{
	id = req.params.id;
	//canbo mongodb online
	db.canbo.remove({_id: mongojs.ObjectID(id)},err =>{
		if(err ){
			res.json({success: false,msg:'Delete wrong'});
		}else{
			res.json({success: true,msg:'Delete success'});
		}
	});
});
module.exports = router;