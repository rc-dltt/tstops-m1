import { verify } from "jsonwebtoken";
import { matches, teams, players, users } from "./db";

const getPrincipal = (token) => {
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (err) {
    return null;
  }
};

export const buildContext = async ({ req }) => {
  const token = (req.headers && req.headers["x-access-token"]) ?? "";

  const principal = getPrincipal(token);

  const dataSources = {
    matches,
    teams,
    players,
    users,
  };

  return {
    dataSources,
    principal,
  };
};
