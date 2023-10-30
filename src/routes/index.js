const { Router } = require("express");

const usersRouter = require("./users.routes");
const MovieNotesRouter = require("./movieNotes.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/movie_notes", MovieNotesRouter);

module.exports = routes;