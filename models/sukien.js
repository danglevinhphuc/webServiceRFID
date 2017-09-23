let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let suKien = new Schema({
	
    tenSuKien: {
        type: String,
        required: true
    },
    ngay:  {
        type: Date,
        required: true
    },
    gioBatDau :  {
        type: String,
        required: true
    },
    gioKetThuc:{
    	type: String,
	required: true
    }
},{collection: "sukien"});

module.exports = mongoose.model("sukien",suKien);
