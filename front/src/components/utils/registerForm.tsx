"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, UserPlus } from "lucide-react"
import { useState } from "react"


interface IRegisterData {
  nombreUsuario: string
  contraseña: string
  confirmarContraseña: string
}
export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<IRegisterData>({
    defaultValues: {
      nombreUsuario: "",
      contraseña: "",
      confirmarContraseña: "",
    },
  });

  const onSubmit = async (data: IRegisterData) => {
    const token = localStorage.getItem("token"); // 👈 obtenemos el token
  
    const response = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 👈 enviamos el token
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
  
    const res = await response.json();
    if (!response.ok) {
      alert(res.message || "Error al registrar");
      return;
    }
  
    alert("Usuario registrado con éxito ✅");
    router.push("/Login");
  };
  

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 bg-slate-800">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-stone-100 shadow-lg sm:rounded-3xl sm:p-16">
          <div className="max-w-md mx-auto">
            <div className="flex justify-center mb-8">
              <Image
                src="/septima.jpg"
                alt="Logo Fuerza Aérea Argentina"
                width={120}
                height={120}
              />
            </div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900">Registro</h1>
              <p className="text-gray-600 mt-2">Ingrese credenciales para crear un usuario</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4">
                <Controller
                  name="nombreUsuario"
                  control={control}
                  rules={{ required: "El nombre de usuario es requerido" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Nombre de Usuario"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300"
                    />
                  )}
                />
                {errors.nombreUsuario && (
                  <span className="text-red-600">{errors.nombreUsuario.message}</span>
                )}

                <Controller
                  name="contraseña"
                  control={control}
                  rules={{ required: "La contraseña es requerida" }}
                  render={({ field }) => (
                    <div className="relative">
                      <input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300"
                      />
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
                {errors.contraseña && (
                  <span className="text-red-600">{errors.contraseña.message}</span>
                )}

                <Controller
                  name="confirmarContraseña"
                  control={control}
                  rules={{
                    required: "Debe confirmar la contraseña",
                    validate: value => value === watch("contraseña") || "Las contraseñas no coinciden",
                  }}
                  render={({ field }) => (
                    <div className="relative">
                      <input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirmar Contraseña"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300"
                      />
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
                {errors.confirmarContraseña && (
                  <span className="text-red-600">{errors.confirmarContraseña.message}</span>
                )}

                <Button type="submit" className="w-full">
                  <UserPlus className="mr-2 h-5 w-5" /> Registrar
                </Button>
              </div>

              
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

