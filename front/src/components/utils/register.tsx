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
