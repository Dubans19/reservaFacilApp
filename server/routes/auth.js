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
    cb: null, "public/uploads/";
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
authRouter.post("/registrarse", async (req, res) => {
  try {
    const { nombre, apellido, email, contrasena } = req.body;

    // const imagen_perfil=req.file
    // if(!imagenPerfil){
    // return res.status(400).send("No file upload")
    // }

    // const imagenPerfilpath= imagenPerfil.path
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
      return res.status(409).json({ message: "Email ya existe" });
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
      fecha_registro:new Date()
    });
    console.log("Document written with ID: ", docRef.id);

    res.status(200).json({ message: "Registro hecho con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Registro fallo" });
  }
});

export default authRouter;
