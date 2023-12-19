const {Router} = require("express");

const SessionsController = require("../controllers/SessionsController");
const sessionsControler = new SessionsController();

const sessionsRoutes = Router();
sessionsRoutes.post("/", sessionsControler.create);


module.exports = sessionsRoutes;