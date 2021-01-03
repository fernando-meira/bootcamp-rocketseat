"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld = void 0;
var CreateUser_1 = __importDefault(require("./services/CreateUser"));
function helloWorld(request, response) {
    var user = CreateUser_1.default({
        name: "Fernando",
        email: 'fernando.santos121@fatec.itapetininga.edu.br',
        password: "12345",
        techs: [
            "NodeJS",
            "ReactJS",
            "TypeScript",
            { title: "Javascript", experience: 100 },
            { title: "NodeJS", experience: 65 }
        ]
    });
    return response.json({ message: "Hello World", user: user });
}
exports.helloWorld = helloWorld;
;
