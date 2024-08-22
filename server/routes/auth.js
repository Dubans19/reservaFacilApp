import express from "express";
import multer from "multer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../firebaseDB.js";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { query, where } from "firebase/firestore";

const authRouter = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
authRouter.post("/registrarse",upload.single('imagenPerfil'), async (req, res) => {
  try {
    const { nombre, apellido, email, contrasena } = req.body;

    const imagenPerfil=req.file
    console.log("imagen perfil es",imagenPerfil)
    if(!imagenPerfil){
    return res.status(400).send({mensage:"No hay una imagen subida",status:400})
    }

    const imagenPerfilpath= imagenPerfil.path
    let email_existe = false;
    const existinguser = query(
      collection(db, "registro"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(existinguser);

    const querys = querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      console.log("la data es", doc.data().email);
      if (doc.data().email) {
        email_existe = true;
      }
    });
    if (email_existe) {
      return res.status(409).json({ mensage: "Email ya existe",status:409});
    }
    // if (!contrasena) {
    //     throw new Error("Password is required");
    // }
    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(contrasena, salt);

    const docRef = await addDoc(collection(db, "registro"), {
      nombre: nombre,
      apellido: apellido,
      email: email,
      contrasena: hashedpassword,
      imagen_perfil:imagenPerfilpath,
      fecha_registro:new Date()
    });
    console.log("Document written with ID: ", docRef.id);

    res.status(200).json({ mensage: "Registro hecho con exito",status:200 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensage: "Registro fallo",status:500});
  }
});

export default authRouter;
