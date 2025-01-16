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
exports.UserController = void 0;
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
const expressValidatorAssync_1 = require("../middlewares/expressValidatorAssync");
const user_service_1 = require("../services/user.service");
const express_validator_1 = require("../validations/express.validator");
class UserController {
    constructor() {
        this.getAll = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userService.findAll();
            res.json(users);
        }));
        this.getOne = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOne(req.params.id);
            res.json(user);
        }));
        this.create = (0, expressValidatorAssync_1.exAsyncWrapper)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.create(req.body);
            res.status(201).json(user);
        }), express_validator_1.userValidationSchema);
        this.update = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.update(req.params.id, req.body);
            res.json(user);
        }));
        this.delete = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const success = yield this.userService.delete(req.params.id);
            res.json({ success });
        }));
        this.userService = new user_service_1.UserService();
    }
}
exports.UserController = UserController;
