import express from "express";
import multer from "multer";

import { db } from "../firebaseDB.js";
import {
    collection,
    addDoc,
    setDoc,
    doc,
    getDocs,
} from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';


const propiedadesRouter = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

propiedadesRouter.post("/crear-propiedad", upload.array("imagenes", 10), async (req, res) => {
    try {
      const uuid = uuidv4().slice(0, 10);
      const { id_propietario,nombre, descripcion, categoria, negocio, precio, area, banos, habitaciones, garages, pisos, direccion,municipio, map_location } = req.body;
  
      // Crear un array con las rutas relativas de las imágenes
      const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);
  
      // Crear la propiedad en Firestore con las imágenes
      const docRef = await addDoc(collection(db, "propiedades"), {
        id_propiedad: uuid,
        id_propietario: id_propietario,
        nombre: nombre,
        descripcion: descripcion,
        categoria: categoria,
        negocio: negocio,
        precio: precio,
        area: area,
        banos: banos,
        habitaciones: habitaciones,
        garages: garages,
        pisos: pisos,
        direccion: direccion,
        municipio:municipio,
        map_location: map_location,
        imagenes_propiedad: imageUrls,  // Guardamos las rutas relativas de las imágenes
        fecha_creacion: new Date(),
      });
  
      console.log("Document written with ID: ", docRef.id);
      res.status(200).json({ mensaje: "Registro de propiedad hecho con éxito", status: 200 });
  
    } catch (error) {
      console.error("Error al crear propiedad: ", error);
      res.status(500).json({ mensaje: `Error: ${error.message}`, status: 500 });
    }
  });


propiedadesRouter.get("/propiedades",async (req,res)=>{
    try {
       
        
        const querySnapshot = await getDocs(collection(db, "propiedades")); // Cambia "collectionName"

        // querySnapshot.forEach((doc) => {
        //   console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);

        // });

        const documents = querySnapshot.docs.map((doc) => ({
        
            ...doc.data()
          }));
          res.status(200).json({ data: documents, status: 200 });   


    } catch (error) {
        res.status(500).json({ mensage:`error ${error}`, status: 500 });   

    }
})


propiedadesRouter.get("/propiedades/:id_propiedad",async (req,res)=>{
    try {
       

        const {id_propiedad}=req.params
        
        const collectionRef = collection(db, "propiedades");
  
        // Filtrar por el ID del documento
        const q = query(collectionRef, where('id_propiedad', '==', id_propiedad));
        
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          querySnapshot.forEach(doc => {
            console.log("Document data:", doc.data());
            res.status(200).json({ data: doc.data(), status: 200 });   

          });
        } else {
            res.status(400).json({ data: "propiedad no encontrada", status: 400 });   

        } 


    } catch (error) {
        res.status(500).json({ mensage:`error ${error}`, status: 500 });   

    }
})




propiedadesRouter.get("/mis-propiedades/:id_propietario",async (req,res)=>{
  try {
     

    const {id_propietario}=req.params
      
      const collectionRef = collection(db, "propiedades");

      // Filtrar por el ID del documento
      const q = query(collectionRef, where('id_propietario', '==', id_propietario));
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
     
        const documents = querySnapshot.docs.map((doc) => ({
        
          ...doc.data()
        }));
        res.status(200).json({ data: documents, status: 200 }); 
      } else {
          res.status(400).json({ data: "propiedades no encontradas para el usuario", status: 400 });   

      } 


  } catch (error) {
      res.status(500).json({ mensage:`error ${error}`, status: 500 });   

  }
})

propiedadesRouter.get("/propiedades/municipio/:municipio",async (req,res)=>{
  try {
     

      const {municipio}=req.params
      
      const collectionRef = collection(db, "propiedades");

      // Filtrar por el ID del documento
      const q = query(collectionRef, where('municipio', '==', municipio));
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
     
        const documents = querySnapshot.docs.map((doc) => ({
        
          ...doc.data()
        }));
        res.status(200).json({ data: documents, status: 200 }); 
      } else {
          res.status(400).json({ data: [], status: 400 });   

      } 


  } catch (error) {
      res.status(500).json({ mensage:`error ${error}`, status: 500 });   

  }
})

export default propiedadesRouter;