const {Router} = require("express");

const SessionsController = require("../controllers/SessionsController");
const sessionsControler = new SessionsController();

const sessionRoutes = Router();
sessionRoutes.post("/", sessionsControler.create);


module.exports = sessionRoutes;