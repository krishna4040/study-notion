"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const dbConnect_1 = require("./config/dbConnect");
const cdConnect_1 = require("./config/cdConnect");
const course_1 = __importDefault(require("./router/course"));
const payment_1 = __importDefault(require("./router/payment"));
const profile_1 = __importDefault(require("./router/profile"));
const user_1 = __importDefault(require("./router/user"));
const app = (0, express_1.default)();
(0, dbConnect_1.dbConnect)();
(0, cdConnect_1.cloudinaryConnect)();
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: '/temp'
}));
app.use((0, cookie_parser_1.default)());
app.use('/api/auth', user_1.default);
app.use('/api/profile', profile_1.default);
app.use('/api/payment', payment_1.default);
app.use('/api/course', course_1.default);
app.get('/', (req, res) => {
    res.send('<h1>Home page</h1>');
});
app.listen(process.env.PORT, () => {
    console.log("App is running succsesfully at", process.env.PORT);
});
