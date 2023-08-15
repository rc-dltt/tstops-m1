"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.horses = exports.races = exports.store = void 0;
const notarealdb_1 = require("notarealdb");
exports.store = new notarealdb_1.DataStore("./dist/data");
exports.races = exports.store.collection("races");
exports.horses = exports.store.collection("horses");
exports.users = exports.store.collection("users");
