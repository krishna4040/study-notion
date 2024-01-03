"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SubSectionSchema = new mongoose_1.Schema({
    title: String,
    timeDuration: String,
    description: String,
    videoUrl: String,
});
module.exports = (0, mongoose_1.model)("SubSection", SubSectionSchema);
