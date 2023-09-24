const controlador={};

controlador.mostrar=(req,res) =>
{
    
    req.getConnection((err, conn) =>{
        if (err) throw err;
        conn.query("SELECT * FROM alumnos", (error,resultados)=>{
            if (error)
            {
                res.json(error);
            }
            const usuario = req.session.usuario;
            if(usuario)
            res.render("alumnos.ejs", {data:resultados, usuario});//checar posible error por ejs
            else
            res.redirect("/");
        });
    });
};

controlador.agregar=(req,res)=>{
    const reg ={
        NL:parseInt(req.body.tfNL,10),
        Nombre:req.body.tfNombre,
        Paterno:req.body.tfPaterno,
        Materno:req.body.tfMaterno
    };
    
    req.getConnection((err,conn)=>{
        if (err)
        throw err;

        console.log(reg);
        conn.query("INSERT INTO alumnos SET ?",[reg], (error, resultados)=>{
            if (error)
            {
                res.json(error);
            }
            res.redirect("/alumnos");
        });
    });
};

controlador.editar=(req, res)=>{
    const NL=parseInt(req.body.tfNL,10);

    var datos;
    var fila;
    
    req.getConnection((err, conn)=>{
        conn.query("SELECT * FROM alumnos",[], (error,resultados)=>{
            datos=resultados;
        });

        conn.query("SELECT * FROM alumnos WHERE NL = ?",[NL], (error,row)=>{
            console.log("datos", datos);
            console.log("fila", row);
            res.render("alumnos_editar.ejs",{data:datos,fila:row})
        });
    });
};

controlador.modificar = (req,res)=>{
    const {NL} = req.params;
    const reg={
        NL: parseInt(req.body.tfNL,10),
        Nombre:req.body.tfNombre,
        Paterno:req.body.tfPaterno,
        Materno:req.body.tfMaterno
    };
    req.getConnection((err,conn)=>{
        conn.query("UPDATE alumnos SET ? WHERE NL=?",[reg, NL], (error, resultados)=>{
            res.redirect("/alumnos");
        });
    });
};

controlador.eliminar= (req, res)=> {
    const {NL}= req.params;
    req.getConnection((err,conn)=>{
        if (err)
        throw err;

        conn.query("DELETE FROM alumnos WHERE NL = ?",[NL], (error,resultados)=>{
            if (error)
            {
                res.json(error);
            }
            res.redirect("/alumnos");
        });
    });
};

module.exports=controlador;