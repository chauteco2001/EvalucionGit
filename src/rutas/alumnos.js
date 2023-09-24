const express =require("express");
const route = express.Router();
const controladorAlumno=require("../controladores/controladorAlumno");

route.get("/", controladorAlumno.mostrar);
route.post("/agregar", controladorAlumno.agregar);
route.get("/eliminar/:NL", controladorAlumno.eliminar);

route.post("/editar", controladorAlumno.editar);
route.post("/modificar/:NL", controladorAlumno.modificar);

module.exports=route;