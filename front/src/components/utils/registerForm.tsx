"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, UserPlus, Trash2, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Check } from "lucide-react";

interface IRegisterData {
  nombreUsuario: string;
  contraseña: string;
  confirmarContraseña: string;
}

interface IUser {
  id: string;
  nombreUsuario: string;
  createdAt: string;
}

export default function AdminPanel() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [userToDelete, setUserToDelete] = useState<IUser | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<IRegisterData>({
    defaultValues: {
      nombreUsuario: "",
      contraseña: "",
      confirmarContraseña: "",
    },
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/auth/usuarios", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error al obtener usuarios");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      showNotification("error", "Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const onSubmit = async (data: IRegisterData) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const res = await response.json();
      if (!response.ok) {
        showNotification("error", res.message || "Error al registrar usuario");
        return;
      }

      setRegisterSuccess(true);
      setTimeout(() => {
        setRegisterSuccess(false);
      }, 2000);

      reset();
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error registering user:", error);
      showNotification("error", "Error al registrar usuario");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3001/auth/usuarios/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar usuario");
      }

      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 2000);

      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error deleting user:", error);
      showNotification(
        "error",
        error instanceof Error ? error.message : "Error al eliminar usuario"
      );
    } finally {
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const confirmDelete = (user: IUser) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 bg-slate-800">
      <div className="relative py-3 sm:max-w-4xl sm:mx-auto px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-stone-100 shadow-lg sm:rounded-3xl sm:p-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <Image
                src="/septima.jpg"
                alt="Logo Fuerza Aérea Argentina"
                width={100}
                height={100}
              />
            </div>
            <div className="text-center mb-6">
              <h1 className="text-3xl font-extrabold text-gray-900">
                Panel de Administración
              </h1>
              <p className="text-gray-600 mt-2">
                Gestión de usuarios del sistema
              </p>
            </div>

            {notification && (
              <Alert
                variant={
                  notification.type === "success" ? "default" : "destructive"
                }
                className="mb-6"
              >
                {notification.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {notification.type === "success" ? "Éxito" : "Error"}
                </AlertTitle>
                <AlertDescription>{notification.message}</AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="register" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger
                  value="register"
                  className="flex items-center justify-center"
                >
                  <UserPlus className="mr-2 h-4 w-4" /> Registrar Usuario
                </TabsTrigger>
                <TabsTrigger
                  value="manage"
                  className="flex items-center justify-center"
                >
                  <Users className="mr-2 h-4 w-4" /> Gestionar Usuarios
                </TabsTrigger>
              </TabsList>

              <TabsContent value="register">
                <Card>
                  <CardHeader>
                    <CardTitle>Crear Nuevo Usuario</CardTitle>
                    <CardDescription>
                      Ingrese las credenciales para crear un nuevo usuario
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="nombreUsuario"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Nombre de Usuario
                          </label>
                          <Controller
                            name="nombreUsuario"
                            control={control}
                            rules={{
                              required: "El nombre de usuario es requerido",
                            }}
                            render={({ field }) => (
                              <input
                                {...field}
                                id="nombreUsuario"
                                placeholder="Nombre de Usuario"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                              />
                            )}
                          />
                          {errors.nombreUsuario && (
                            <span className="text-red-600 text-sm">
                              {errors.nombreUsuario.message}
                            </span>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="contraseña"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Contraseña
                          </label>
                          <Controller
                            name="contraseña"
                            control={control}
                            rules={{ required: "La contraseña es requerida" }}
                            render={({ field }) => (
                              <div className="relative">
                                <input
                                  {...field}
                                  id="contraseña"
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Contraseña"
                                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-2 top-2 text-gray-500"
                                >
                                  {showPassword ? (
                                    <EyeOff size={20} />
                                  ) : (
                                    <Eye size={20} />
                                  )}
                                </button>
                              </div>
                            )}
                          />
                          {errors.contraseña && (
                            <span className="text-red-600 text-sm">
                              {errors.contraseña.message}
                            </span>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="confirmarContraseña"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Confirmar Contraseña
                          </label>
                          <Controller
                            name="confirmarContraseña"
                            control={control}
                            rules={{
                              required: "Debe confirmar la contraseña",
                              validate: (value) =>
                                value === watch("contraseña") ||
                                "Las contraseñas no coinciden",
                            }}
                            render={({ field }) => (
                              <div className="relative">
                                <input
                                  {...field}
                                  id="confirmarContraseña"
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  placeholder="Confirmar Contraseña"
                                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                  }
                                  className="absolute right-2 top-2 text-gray-500"
                                >
                                  {showConfirmPassword ? (
                                    <EyeOff size={20} />
                                  ) : (
                                    <Eye size={20} />
                                  )}
                                </button>
                              </div>
                            )}
                          />
                          {errors.confirmarContraseña && (
                            <span className="text-red-600 text-sm">
                              {errors.confirmarContraseña.message}
                            </span>
                          )}
                        </div>

                        <Button type="submit" className="w-full">
                          <UserPlus className="mr-2 h-5 w-5" /> Registrar
                          Usuario
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="manage">
                <Card>
                  <CardHeader>
                    <CardTitle>Gestión de Usuarios</CardTitle>
                    <CardDescription>
                      Lista de usuarios registrados en el sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* <div className="mb-4">
                      <Button variant="outline" onClick={fetchUsers} className="flex items-center">
                        <UserCog className="mr-2 h-4 w-4" /> Actualizar Lista
                      </Button>
                    </div> */}

                    {loading ? (
                      <div className="text-center py-8">
                        Cargando usuarios...
                      </div>
                    ) : users.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No hay usuarios registrados
                      </div>
                    ) : (
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Nombre de Usuario</TableHead>
                              <TableHead className="text-right">
                                Eliminar
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {users.map((user) => (
                              <TableRow key={user.id}>
                                <TableCell className="font-medium">
                                  {user.nombreUsuario}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    size="sm"
                                    onClick={() => confirmDelete(user)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden border-none shadow-lg bg-transparent">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl"></div>
            <div className="relative bg-stone-100 shadow-lg rounded-3xl p-8">
              <div className="flex flex-col items-center">
                <div className="mx-auto my-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <Trash2 className="h-8 w-8 text-red-600" strokeWidth={2} />
                </div>
                <DialogHeader className="pb-2">
                  <DialogTitle className="text-3xl font-extrabold text-gray-900 text-center">
                    Confirmar Eliminación
                  </DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-center text-base text-gray-700 mt-2 mb-6 px-4">
                  ¿Está seguro que desea eliminar al usuario{" "}
                  <strong>{userToDelete?.nombreUsuario}</strong>?<br />
                  Esta acción no se puede deshacer.
                </DialogDescription>
                <div className="flex space-x-4 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDeleteDialogOpen(false)}
                    className="px-6"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={() =>
                      userToDelete && handleDeleteUser(userToDelete.id)
                    }
                    className="bg-gradient-to-r from-red-600 to-red-400 text-white px-6"
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={registerSuccess} onOpenChange={setRegisterSuccess}>
        <DialogContent className="max-w-md p-0 overflow-hidden border-none shadow-lg bg-transparent">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl"></div>
            <div className="relative bg-stone-100 shadow-lg rounded-3xl p-8">
              <div className="flex flex-col items-center">
                <div className="mx-auto my-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                  <Check className="h-12 w-12 text-blue-600" strokeWidth={3} />
                </div>
                <DialogHeader className="pb-2">
                  <DialogTitle className="text-3xl font-extrabold text-gray-900 text-center">
                    ¡Usuario registrado con éxito!
                  </DialogTitle>
                </DialogHeader>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteSuccess} onOpenChange={setDeleteSuccess}>
        <DialogContent className="max-w-md p-0 overflow-hidden border-none shadow-lg bg-transparent">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl"></div>
            <div className="relative bg-stone-100 shadow-lg rounded-3xl p-8">
              <div className="flex flex-col items-center">
                <div className="mx-auto my-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                  <Check className="h-12 w-12 text-blue-600" strokeWidth={3} />
                </div>
                <DialogHeader className="pb-2">
                  <DialogTitle className="text-3xl font-extrabold text-gray-900 text-center">
                    ¡Usuario eliminado con éxito!
                  </DialogTitle>
                </DialogHeader>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
