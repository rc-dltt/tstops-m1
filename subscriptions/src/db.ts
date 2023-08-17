import { DataStore } from "notarealdb";

export const store = new DataStore("./dist/data");

export const users = store.collection("users");
