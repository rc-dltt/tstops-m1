import { DataStore } from "notarealdb";

export const store = new DataStore("./dist/data");

export const matches = store.collection("matches");

export const teams = store.collection("teams");

export const players = store.collection("players");

export const users = store.collection("users");
