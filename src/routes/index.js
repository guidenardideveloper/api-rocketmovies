const { Router } = require("express");

const usersRouter = require("./users.routes");
const MovieNotesRouter = require("./movieNotes.routes");
const tagsRouter = require("./movieTags.routes")

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/movie_notes", MovieNotesRouter);
routes.use("/tags", tagsRouter);

module.exports = routes;