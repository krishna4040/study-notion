"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mailSender_1 = require("../utils/mailSender");
const emailVerificationTemplate_1 = require("../mail/emailVerificationTemplate");
const OTPSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5
    }
});
function sendVerificationEmail(email, otp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, mailSender_1.mailSender)(email, "Verification Email", (0, emailVerificationTemplate_1.emailTemplate)(otp));
        }
        catch (error) {
            console.log(error);
        }
    });
}
OTPSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this === null || this === void 0 ? void 0 : this.isNew) {
            yield sendVerificationEmail(this === null || this === void 0 ? void 0 : this.email, this === null || this === void 0 ? void 0 : this.otp);
        }
        next();
    });
});
exports.default = (0, mongoose_1.model)("OTP", OTPSchema);
