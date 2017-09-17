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
    }
},{collection: "sukien"});

module.exports = mongoose.model("sukien",suKien);