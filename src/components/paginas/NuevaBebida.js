import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FirebaseContext } from '../../firebase';
import {useNavigate} from'react-router-dom'
import FileUploader from 'react-firebase-file-uploader'


const NuevaBebida = () => {

        const [subiendo, guardarSubiendo] = useState(false)
        const [progreso, guardarProgreso] = useState(0)
        const [urlimagen, guardarUrlimagen] = useState('')


    //Context con las operaciones de firestore 
    const { firebase } = useContext(FirebaseContext);

    const navigate = useNavigate();

    console.log(firebase);

    //validacion y leer los datos formulario
    const formik = useFormik({
        initialValues: {
            nombre: '',
            precio: '',
            ingredientes: '',
            preparacion: '',
            descripcion:'',
            imagen: '',


        },

        validationSchema: Yup.object({
            nombre: Yup.string()
                .min(3, 'Las bebidas deben tener al menos 3 caracteres')
                .required('El nombre de la bebida es obligatorio'),

            precio: Yup.number()
                .min(1, 'Debes agregar un numero')
                .required('El precio es obligatorio'),

            ingredientes: Yup.string()
                .min(3, 'Las bebidas deben tener al menos 3 caracteres')
                .required('El ingrediente del taller es obligatorio'),
          
            preparacion: Yup.string()
                .min(10, 'La preparacion debe tener al menos 10 caracteres')
                .required('La preparacion es obligatorio'),
                descripcion: Yup.string()
                .min(10, 'La Descripcion debe tener al menos 10 caracteres')
                .required('La preparacion es obligatorio')
        }),
        

        onSubmit: mostrarbebida => {
            try {
                mostrarbebida.existencia = true;
                mostrarbebida.imagen = urlimagen;
                
                firebase.db.collection('bebidas').add(mostrarbebida)
                navigate('/menu')
            } catch (error) {
                console.log(error)
            }
        }
    });



    const handleUploadStart = () =>{
    guardarProgreso(0);
    guardarSubiendo(true);
    }
    const handleUploadError = error =>{
    guardarSubiendo(false);
    console.log(error);
    }
    const handleUploadSuccess = async nombre =>{
    guardarProgreso(100);
    guardarSubiendo(false);
      const url = await firebase      
                .storage
                .ref("bebidas")
                .child(nombre)
                .getDownloadURL()
     console.log(url)
     guardarUrlimagen(url)
    }
    const handleProgress = progreso =>{
    guardarProgreso(progreso);
    console.log(progreso)
    }
    return (
        <>
<h1 className="text-3xl font-light mb-4 text-center">Agregar Bebida</h1>

            <div className="flex justify-center mt-4">
                <div className="w-full max-w-3xl">

                    <form onSubmit={formik.handleSubmit}>

                        {/* Nombre */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                Nombre
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="nombre" type="text" placeholder="Nombre de la bebida"
                                value={formik.values.nombre} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.nombre && formik.errors.nombre ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">
                                    Hubo un error!
                                </p>
                                <p>
                                    {formik.errors.nombre}
                                </p>
                            </div>
                        ) : null}

                        {/* Precio */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                                Precio
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="precio" type="number" placeholder="$" min="0"
                                value={formik.values.precio} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.precio && formik.errors.precio ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">
                                    Hubo un error!
                                </p>
                                <p>
                                    {formik.errors.precio}
                                </p>
                            </div>
                        ) : null}

                        {/* ingredientes */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ingredientes">
                            Ingredientes
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="ingredientes" type="text" placeholder="ingredientes de la bebida"
                                value={formik.values.ingredientes} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.ingredientes && formik.errors.ingredientes ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">
                                    Hubo un error!
                                </p>
                                <p>
                                    {formik.errors.ingredientes}
                                </p>
                            </div>
                        ) : null}

                         {/* preparacion */}
                         <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="preparacion">
                            Preparacion
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="preparacion" type="text" placeholder="preparacion de la bebida"
                                value={formik.values.preparacion} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.preparacion && formik.errors.preparacion ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">
                                    Hubo un error!
                                </p>
                                <p>
                                    {formik.errors.preparacion}
                                </p>
                            </div>
                        ) : null}
                        
                         {/* Descripcion */}
                         <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
                            Descripcion
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="descripcion" type="text" placeholder="descripcion de la bebida"
                                value={formik.values.descripcion} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.descripcion && formik.errors.descripcion ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">
                                    Hubo un error!
                                </p>
                                <p>
                                    {formik.errors.descripcion}
                                </p>
                            </div>
                        ) : null}
                        {/* Imagen */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">
                                Imagen
                            </label>
                           <FileUploader
                            accept="imagen/*"
                            id="imagen"
                            name="imagen"
                            randomizeFilename
                            storageRef={firebase.storage.ref("bebidas")}
                            onUploadStart={handleUploadStart}
                            onUploadError={handleUploadError}
                            onUploadSuccess={handleUploadSuccess}
                            onProgress={handleProgress}
                           />
                        </div>
                            {subiendo && (
                                <div className="h-12 relative w-full border">
                                    <div className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center" style={{width: `${progreso}%`}}>
                                        {progreso} %
                                    </div>
                                </div>
                            )}
                            {urlimagen && (
                                <p className='bg-green-500 text-white p-3 text-center my-5'>
                                    La imagen se subio correctamente
                                </p>
                            )}
                       

                        {/* Boton */}
                        <input
                            type="submit"
                            className='bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase'
                            value="Agregar Boba"
                        />

                    </form>
                </div>
            </div>
        </>

    )
}




export default NuevaBebida;