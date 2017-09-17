let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let canBo = new Schema({
	rfid: {
        type: String,
        required: true
    },
    MSCB:  {
        type: String,
        required: true
    },
    hoTen: String,
    email: String,
    donVi: String
},{collection: "canbo"});

module.exports = mongoose.model("canbo",canBo);