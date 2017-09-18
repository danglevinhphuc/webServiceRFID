let express = require("express");
let danhsach = require("../models/danhsach");
let mongojs = require("mongojs");
let database = require("../config/db");
/**** KHAI BAO ROUTER() **/
let router = express.Router();

/*** KET NOI DATABASE MLAB ONLINE **/
var db = mongojs(database.database,['danhsach']);
// GET API DANH SACH CAN BO
router.get("/gets",(req,res) =>{
	// lay tat ca du lieu
	db.danhsach.find((err,docs)=>{
		if(err){
			res.send(err);
		}
		// CHUYEN THANH JSON
		res.json(docs);
	});
});

// POST API THEM 1 danhsach
router.post("/post",(req,res)=>{
	// lay du lieu tu form
	// chuyen tai 1 json can bo moi
	let newdanhsach = new danhsach({
		"MSSV" : req.body.MSSV,
		"MSCB" : req.body.MSCB
	});
	// them du lieu vao csdl
	db.danhsach.save(newdanhsach,err =>{
		if(err){
			res.json({success: false,msg:'ADD error'});
		}else{
			res.json({success: true,msg:'ADD success'});		
		}
	});
});
// PUT API SUA THONG TIN danhsach QUA ID
router.put("/put/:id",(req,res) =>{
	let id = req.params.id;
	// tao du lieu de sua
	let dataEdit ={
		"MSSV" : req.body.MSSV,
		"MSCB" : req.body.MSCB
	};
	db.danhsach.update({_id: mongojs.ObjectID(id)}, dataEdit, err=> {
		if(err){
			res.json({success: false,msg:'Not update danhsach'});
		}else{
			// Check have exits products
			// Unless infrom or alert by json
			res.json({success: true,msg:'Update success'});
		}
	});
});
// DELETE API XOA danhsach THONG QUA ID
router.delete("/delete/:id",(req,res)=>{
	id = req.params.id;
	//danhsach mongodb online
	db.danhsach.remove({_id: mongojs.ObjectID(id)},err =>{
		if(err ){
			res.json({success: false,msg:'Delete wrong'});
		}else{
			res.json({success: true,msg:'Delete success'});
		}
	});
});
/*** HAM DUNG DE CHUYEN DOI NGAY THANG NAM **/
module.exports = router;
