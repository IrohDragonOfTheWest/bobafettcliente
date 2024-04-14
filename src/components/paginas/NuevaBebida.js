import React from "react";
import { useFormik } from "formik";


const NuevaBebida = () => {

    const formik = useFormik({
        initialValues: {
            nombre: '',
            precio: '',
            ingredientes: '',
            preparacion: '',
            imagen: '',

        },
        onSubmit: datos => {
            console.log(datos);
        }
    })

    return (
        <>
            <h1 className="text-3xl font-light mb-4">
                Agregar Nueva Bebida
            </h1>
            <div className="flex justify-center mt-4">
                <div className="w-full max-w-3xl">
                    <form onSubmit={formik.handleSubmit}>

                        <div className="mb-4">
                            <label>
                                Nombre de la bebida
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nombre" type="text" placeholder="Nombre" value={formik.values.nombre} onChange={formik.handleChange} />
                        </div>

                        <div className="mb-4">
                            <label>
                                Precio de la bebida
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="precio" type="numbre" placeholder="$" min="0" value={formik.values.precio} onChange={formik.handleChange}/>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ingredientes">
                                Ingredientes
                            </label>
                            <textArea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="ingredientes" type="text" placeholder="Ingredientes de la Bebida" value={formik.values.ingredientes} onChange={formik.handleChange}>
                            </textArea>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="preparacion">
                                Preparacion
                            </label>
                            <textArea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="preparacion" type="text" placeholder="Preparacion de la bebida" value={formik.values.preparacion} onChange={formik.handleChange}>
                            </textArea>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">
                                Imagen
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="imagen" type="file" value={formik.values.imagen} onChange={formik.handleChange}/>
                        </div>

                        <input
                            type="submit"
                            className="bg-yellow-800 hover:bg-gry-900 w-full mt-5 p-2 text-white uppercase"
                            value="Agregar Bebida"
                        />

                    </form>
                </div>
            </div>
        </>
    )
}

export default NuevaBebida;