"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildContext = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const db_1 = require("./db");
const getPrincipal = (token) => {
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        return decoded.id;
    }
    catch (err) {
        return null;
    }
};
const buildContext = async ({ req }) => {
    const token = (req.headers && req.headers["x-access-token"]) ?? "";
    const principal = getPrincipal(token);
    const dataSources = {
        races: db_1.races,
        horses: db_1.horses,
        users: db_1.users,
    };
    return {
        dataSources,
        principal,
    };
};
exports.buildContext = buildContext;
