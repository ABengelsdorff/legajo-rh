"use client";

import type React from "react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  getUserByDni,
  getUserByApellido,
  getUserByCargo,
  getUserByCurso,
} from "../../services/userServices";
import { IUser } from "@/components/interfaces/interfaces";
import { Printer, Edit, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { printUser } from "@/components/utils/printUser";
import UserDetail from "@/components/utils/userDetail";
import { updateUser } from "../../services/userServices";
import { Check } from "lucide-react";
import LegajoProfesional from "./legajoProfesional";

export default function LegajoSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("iosfa");
  const [searchResults, setSearchResults] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const editFormRef = useRef<HTMLDivElement | null>(null);
  const resultadoRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let result: IUser | IUser[];

      if (searchType === "dni") {
        const dniNumber = Number(searchQuery);
        if (isNaN(dniNumber) || dniNumber <= 0) {
          setError("Ingrese un DNI válido.");
          setLoading(false);
          return;
        }
        result = await getUserByDni(dniNumber);
      } else if (searchType === "apellido") {
        if (!searchQuery.trim()) {
          setError("Ingrese un apellido válido.");
          setLoading(false);
          return;
        }
        result = await getUserByApellido(searchQuery);
      } else if (searchType === "cargo") {
        if (!searchQuery.trim()) {
          setError("Ingrese un cargo válido.");
          setLoading(false);
          return;
        }
        result = await getUserByCargo(searchQuery);
      } else if (searchType === "curso") {
        if (!searchQuery.trim()) {
          setError("Ingrese un curso válido.");
          setLoading(false);
          return;
        }
        result = await getUserByCurso(searchQuery);
      }

      console.log("🔍 Datos recibidos de la API:", result);
      setSearchResults(Array.isArray(result) ? result : [result]);
    } catch {
      setError("No se encontraron resultados.");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (user: IUser) => {
    setSelectedUser(user);
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const handleEditUser = () => {
    setIsEditMode(true);
  };

  const handlePrintUser = () => {
    if (!selectedUser) return;
    printUser(selectedUser);
  };

  useEffect(() => {
    if (isEditMode && editFormRef.current) {
      editFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isEditMode]);

  const handleDownloadPDF = async () => {
    const jsPDF = (await import("jspdf")).default;
    const html2canvas = (await import("html2canvas")).default;

    const pdf = new jsPDF("p", "mm", "a4");
    const anchoPDF = pdf.internal.pageSize.getWidth(); // 210 mm
    const altoPDF = pdf.internal.pageSize.getHeight(); // 297 mm

    const nombre = searchQuery.replace(/\s+/g, "-").toLowerCase();
    const titulo = `Resultado de búsqueda según: ${searchType.toUpperCase()} - ${searchQuery}`;

    let posicionY = 20; // Dejamos espacio para el título
    const margenLateral = 10;
    const espacioEntreFichas = 5;

    const drawHeader = () => {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.text(titulo, anchoPDF / 2, 10, { align: "center" });
    };

    drawHeader(); // Imprimimos el título en la primera página

    for (let i = 0; i < resultadoRefs.current.length; i++) {
      const div = resultadoRefs.current[i];
      if (!div) continue;

      // Ocultar botones
      const botones = div.querySelectorAll("button");
      botones.forEach((btn) => btn.classList.add("hidden"));

      const canvas = await html2canvas(div, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = anchoPDF - 2 * margenLateral;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      // Si no entra, agregamos una página y redibujamos el título
      if (posicionY + imgHeight > altoPDF - 10) {
        pdf.addPage();
        drawHeader();
        posicionY = 20;
      }

      pdf.addImage(
        imgData,
        "JPEG",
        margenLateral,
        posicionY,
        imgWidth,
        imgHeight
      );
      posicionY += imgHeight + espacioEntreFichas;

      // Restaurar botones
      botones.forEach((btn) => btn.classList.remove("hidden"));
    }

    pdf.save(`legajo-${nombre}.pdf`);
  };

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 bg-slate-800">
      <div className="relative py-3 sm:max-w-6xl sm:mx-auto px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-stone-100 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-full mx-auto">
            <div className="flex justify-center mb-8">
              <Image
                src="/logohr.png"
                alt="Logo Recursos Humanos"
                width={250}
                height={250}
                className="drop-shadow-md"
              />
            </div>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold text-gray-900">
                Búsqueda de Legajo
              </h1>
            </div>
            <form onSubmit={handleSearch} className="space-y-8">
              {/* Botones para seleccionar el criterio de búsqueda */}
              <div className="flex flex-wrap gap-4 mb-4 justify-center">
                <button
                  type="button"
                  onClick={() => setSearchType("apellido")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    searchType === "apellido"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  Buscar por Apellido
                </button>

                <button
                  type="button"
                  onClick={() => setSearchType("dni")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    searchType === "dni"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  Buscar por DNI
                </button>

                <button
                  type="button"
                  onClick={() => setSearchType("cargo")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    searchType === "cargo"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  Buscar por Cargo
                </button>
                <button
                  type="button"
                  onClick={() => setSearchType("curso")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    searchType === "curso"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  Buscar por Curso
                </button>
              </div>
              {/* Campo de búsqueda */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <input
                    // Usamos "number" solo para IOSFA y DNI, y "text" para los demás
                    type={searchType === "dni" ? "number" : "text"}
                    placeholder={
                      searchType === "dni"
                        ? "Ingrese Número de DNI"
                        : searchType === "apellido"
                        ? "Ingrese Apellido"
                        : searchType === "grado"
                        ? "Ingrese Grado"
                        : searchType === "cargo"
                        ? "Ingrese Cargo"
                        : "Ingrese Curso"
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-gray-900 flex-1 px-4 py-2 rounded-lg border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-300 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 transition-all"
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </form>

            {loading && (
              <div className="flex justify-center mt-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}

            {error && (
              <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
                {error}
              </div>
            )}

            {searchResults.length > 0 && (
              <div
                id="resultados-container"
                className="mt-8 space-y-8 text-black"
              >
                <div className="flex justify-between">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Resultado de Búsqueda
                  </h2>

                  <Button
                    onClick={handleDownloadPDF}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-300 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 transition-all"
                  >
                    Descargar PDF
                  </Button>
                </div>

                {searchResults.map((result, index) => (
                  <div
                    key={result.id}
                    ref={(el) => {
                      resultadoRefs.current[index] = el;
                    }}
                    className="bg-white p-6 rounded-lg shadow-md mb-8 "
                  >
                    <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg mb-4">
                      <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        Información Personal de{" "}
                        <strong>
                          {result.apellido} {result.nombre}
                        </strong>
                      </h3>
                      <div className="grid grid-cols-4 gap-4 text-black">
                        <p>
                          <strong>Activo:</strong> {result.activo}
                        </p>

                        <p>
                          <strong>Sexo:</strong> {result.sexo}
                        </p>
                        <p>
                          <strong>Celular:</strong> {result.telefono}
                        </p>
                        <p>
                          <strong>DNI:</strong> {result.numeroDeDni}
                        </p>
                        <p>
                          <strong>Cargo:</strong> {result.cargo}
                        </p>
                        <p>
                          <strong>Fecha de ingreso</strong>{" "}
                          {result.fechaIngreso}
                        </p>
                        <p>
                          <strong>Especialidad:</strong> {result.especialidad}
                        </p>
                        <p>
                          <strong>Departamento</strong> {result.departamento}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button
                          onClick={() => handleViewDetails(result)}
                          className="print:hidden px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-300 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 transition-all"
                        >
                          Ver más información{" "}
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Diálogo para mostrar información detallada del usuario */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex justify-between items-center">
              <span>
                {isEditMode
                  ? "Editar información de "
                  : "Información detallada de "}
                {selectedUser?.nombre} {selectedUser?.apellido}
              </span>
            </DialogTitle>
          </DialogHeader>

          {selectedUser && (
            <div className="mt-4">
              {isEditMode ? (
                <div ref={editFormRef}>
                  <LegajoProfesional
                    initialData={selectedUser}
                    onSave={async (updatedUser) => {
                      try {
                        const savedUser = await updateUser(
                          updatedUser.id,
                          updatedUser
                        );
                        setSelectedUser(savedUser);
                        setIsEditMode(false);

                        setSearchResults((prev) =>
                          prev.map((u) =>
                            u.id === savedUser.id ? savedUser : u
                          )
                        );

                        setShowSuccessAlert(true);
                        setTimeout(() => {
                          setShowSuccessAlert(false);
                          setIsDialogOpen(false);
                          setIsEditMode(false);
                          setSelectedUser(null);
                        }, 2000);
                      } catch (error) {
                        console.error("❌ Error al guardar:", error);
                        alert("Ocurrió un error al guardar los cambios.");
                      }
                    }}
                  />
                </div>
              ) : (
                <UserDetail user={selectedUser} />
              )}

              {!isEditMode && (
                <div className="mt-6 flex justify-end gap-4">
                  <Button
                    onClick={handleEditUser}
                    className="flex items-center gap-2"
                    variant="outline"
                  >
                    <Edit className="h-4 w-4" /> Editar información
                  </Button>
                  <Button
                    onClick={handlePrintUser}
                    className="flex items-center gap-2"
                  >
                    <Printer className="h-4 w-4" /> Imprimir
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={showSuccessAlert} onOpenChange={setShowSuccessAlert}>
        <DialogContent className="max-w-md p-0 overflow-hidden border-none shadow-lg bg-transparent [&>button]:hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl"></div>

            <div className="relative bg-stone-100 shadow-lg rounded-3xl p-8">
              <div className="flex flex-col items-center">
                <div className="mx-auto my-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                  <Check className="h-12 w-12 text-blue-600" strokeWidth={3} />
                </div>

                <DialogHeader className="pb-2">
                  <DialogTitle className="text-3xl font-extrabold text-gray-900 text-center">
                    Cambios realizados con éxito
                  </DialogTitle>
                  <DialogDescription className="text-center text-gray-600">
                    Los cambios han sido guardados correctamente en el sistema
                  </DialogDescription>
                </DialogHeader>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
