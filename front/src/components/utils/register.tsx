"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Controller, useForm } from "react-hook-form"
import { IRegisterData } from "../interfaces/interfaces"
import { ValidacionLegajo } from "./rulesForm"

import { Button } from "@/components/ui/button"
import { Eye, EyeOff, UserPlus } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { registerUserServices } from "@/services/userServices" 

export default function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IRegisterData>({
    defaultValues: {
      nombre: "",
      apellido: "",
      grado: "",
      cargo: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const grados = [
    "Brigadier General",
    "Brigadier Mayor",
    "Brigadier",
    "Comodoro",
    "Vicecomodoro",
  ]

  const onSubmit = async (data: IRegisterData) => {
    const res = await registerUserServices(data)
    if (res) {
      alert("Usuario creado con éxito")
      router.push("/Login")
    }
  }

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 bg-slate-800">
      <div className="relative py-3 sm:max-w-2xl sm:mx-auto px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-stone-100 shadow-lg sm:rounded-3xl sm:p-16">
          <div className="max-w-md mx-auto">
            <div className="flex justify-center mb-8">
              <Image
                src="/septima.jpg"
                alt="Logo Fuerza Aérea Argentina"
                width={120}
                height={120}
                className="drop-shadow-md"
              />
            </div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900">Registro de Usuario</h1>
              <p className="text-gray-600 mt-2">Complete el formulario para crear su cuenta</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4">
                <Controller
                  name="nombre"
                  control={control}
                  rules={ValidacionLegajo.nombre}
                  render={({ field }) => (
                    <Input {...field} placeholder="Nombre" />
                  )}
                />
                {errors.nombre && <span className="text-red-600">{errors.nombre.message}</span>}

                <Controller
                  name="apellido"
                  control={control}
                  rules={ValidacionLegajo.apellido}
                  render={({ field }) => (
                    <Input {...field} placeholder="Apellido" />
                  )}
                />
                {errors.apellido && <span className="text-red-600">{errors.apellido.message}</span>}

                <Controller
                  name="grado"
                  control={control}
                  rules={{ required: "Seleccione un grado" }}
                  render={({ field }) => (
                    <select {...field} className="w-full px-4 py-2 rounded-lg border border-gray-300">
                      <option value="">Seleccione un grado</option>
                      {grados.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  )}
                />
                {errors.grado && <span className="text-red-600">{errors.grado.message}</span>}

                <Controller
                  name="cargo"
                  control={control}
                  rules={ValidacionLegajo.cargo}
                  render={({ field }) => (
                    <Input {...field} placeholder="Cargo" />
                  )}
                />
                {errors.cargo && <span className="text-red-600">{errors.cargo.message}</span>}

                <Controller
                  name="email"
                  control={control}
                  rules={ValidacionLegajo.email}
                  render={({ field }) => (
                    <Input {...field} placeholder="Correo Electrónico" type="email" />
                  )}
                />
                {errors.email && <span className="text-red-600">{errors.email.message}</span>}

                <Controller
                  name="password"
                  control={control}
                  rules={ValidacionLegajo.password}
                  render={({ field }) => (
                    <div className="relative">
                      <Input {...field} type={showPassword ? "text" : "password"} placeholder="Contraseña" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2 text-gray-500"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  )}
                />
                {errors.password && <span className="text-red-600">{errors.password.message}</span>}

                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={ValidacionLegajo.confirmPassword}
                  render={({ field }) => (
                    <div className="relative">
                      <Input {...field} type={showConfirmPassword ? "text" : "password"} placeholder="Confirmar Contraseña" />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 top-2 text-gray-500"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  )}
                />
                {errors.confirmPassword && <span className="text-red-600">{errors.confirmPassword.message}</span>}

                <Button type="submit" className="w-full"> 
                  <UserPlus className="mr-2 h-5 w-5" /> Registrarse
                </Button>
              </div>

              <div className="text-center mt-4">
                <p className="text-gray-600">
                  ¿Ya tiene una cuenta?{' '}
                  <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                    Iniciar sesión
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}












// "use client"

// import type React from "react"

// import { useState } from "react"
// import Image from "next/image"
// import { Eye, EyeOff, UserPlus } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"

// export default function RegisterForm() {
//   const [formData, setFormData] = useState({
//     nombre: "",
//     apellido: "",
//     grado: "",
//     cargo: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")

//     // Validate inputs
//     if (Object.values(formData).some((value) => !value)) {
//       setError("Todos los campos son obligatorios.")
//       return
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError("Las contraseñas no coinciden.")
//       return
//     }

//     setLoading(true)

//     try {
//       // Here you would implement your actual registration logic
//       // For example: await register(formData);
//       console.log("Registrando usuario:", formData)

//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))

//       // Redirect after successful registration
//       // router.push('/login');
//     } catch (err) {
//       setError("Error al registrar usuario. Intente nuevamente.")
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Lista de grados para el select
//   const grados = [
//     "Brigadier General",
//     "Brigadier Mayor",
//     "Brigadier",
//     "Comodoro",
//     "Vicecomodoro",
//     "Mayor",
//     "Capitán",
//     "Primer Teniente",
//     "Teniente",
//     "Alférez",
//     "Suboficial Mayor",
//     "Suboficial Principal",
//     "Suboficial Ayudante",
//     "Suboficial Auxiliar",
//     "Cabo Principal",
//     "Cabo Primero",
//     "Cabo",
//     "Voluntario Primero",
//     "Voluntario Segundo",
//   ]

//   return (
//     <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 bg-slate-800">
//       <div className="relative py-3 sm:max-w-2xl sm:mx-auto px-4">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//         <div className="relative bg-stone-100 shadow-lg sm:rounded-3xl sm:p-16">
//           <div className="max-w-md mx-auto">
//             <div className="flex justify-center mb-8">
//               <Image
//                 src="/septima.jpg"
//                 alt="Logo Fuerza Aérea Argentina"
//                 width={120}
//                 height={120}
//                 className="drop-shadow-md"
//               />
//             </div>
//             <div className="text-center mb-8">
//               <h1 className="text-3xl font-extrabold text-gray-900">Registro de Usuario</h1>
//               <p className="text-gray-600 mt-2">Complete el formulario para crear su cuenta</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="bg-gray-50 p-6 rounded-lg shadow-md">
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
//                         Nombre
//                       </label>
//                       <input
//                         id="nombre"
//                         name="nombre"
//                         type="text"
//                         value={formData.nombre}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         placeholder="Ingrese su nombre"
//                       />
//                     </div>

//                     <div>
//                       <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
//                         Apellido
//                       </label>
//                       <input
//                         id="apellido"
//                         name="apellido"
//                         type="text"
//                         value={formData.apellido}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         placeholder="Ingrese su apellido"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label htmlFor="grado" className="block text-sm font-medium text-gray-700 mb-1">
//                         Grado
//                       </label>
//                       <select
//                         id="grado"
//                         name="grado"
//                         value={formData.grado}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       >
//                         <option value="">Seleccione un grado</option>
//                         {grados.map((grado) => (
//                           <option key={grado} value={grado}>
//                             {grado}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div>
//                       <label htmlFor="cargo" className="block text-sm font-medium text-gray-700 mb-1">
//                         Cargo
//                       </label>
//                       <input
//                         id="cargo"
//                         name="cargo"
//                         type="text"
//                         value={formData.cargo}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         placeholder="Ingrese su cargo"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                       Correo Electrónico
//                     </label>
//                     <input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="ejemplo@faa.gob.ar"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                       Contraseña
//                     </label>
//                     <div className="relative">
//                       <input
//                         id="password"
//                         name="password"
//                         type={showPassword ? "text" : "password"}
//                         value={formData.password}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         placeholder="Ingrese su contraseña"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                       >
//                         {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                       </button>
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
//                       Confirmar Contraseña
//                     </label>
//                     <div className="relative">
//                       <input
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         type={showConfirmPassword ? "text" : "password"}
//                         value={formData.confirmPassword}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         placeholder="Confirme su contraseña"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                       >
//                         {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {error && (
//                 <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">{error}</div>
//               )}

//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-300 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 transition-all flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
//                 ) : (
//                   <>
//                     <UserPlus className="h-5 w-5" />
//                     Registrarse
//                   </>
//                 )}
//               </Button>

//               <div className="text-center mt-4">
//                 <p className="text-gray-600">
//                   ¿Ya tiene una cuenta?{" "}
//                   <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
//                     Iniciar Sesión
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

