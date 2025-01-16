"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("./routes/user.routes");
const errorHanlder_1 = require("./middlewares/errorHanlder");
function errorHandler2(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render('error', { error: err });
}
class App {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.get('/', (req, res) => {
            throw new Error('BROKEN'); // Express will catch this on its own.
        });
        this.app.use('/api/users', new user_routes_1.UserRoutes().router);
        this.app.use(errorHanlder_1.errorHandler);
        this.app.use((req, res, next) => {
            res.status(404).send('Route not found');
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
exports.default = App;
