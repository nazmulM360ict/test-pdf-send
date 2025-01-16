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
exports.UserService = void 0;
class UserService {
    constructor() {
        this.users = [
            { id: '1', name: 'John Doe', email: 'john@example.com' },
            { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
        ];
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.find((user) => user.id === id) || null;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.users.push(data);
            return data;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.find((user) => user.id === id);
            if (user) {
                Object.assign(user, data);
                return user;
            }
            return null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.users.findIndex((user) => user.id === id);
            if (index > -1) {
                this.users.splice(index, 1);
                return true;
            }
            return false;
        });
    }
}
exports.UserService = UserService;
