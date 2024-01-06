"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sectionSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    sectionName: {
        type: String,
    },
    subSection: [{
            type: mongoose_1.Schema.Types.ObjectId,
            required: true,
            ref: "SubSection",
        }],
});
exports.default = (0, mongoose_1.model)("Section", sectionSchema);
