"use client";

import { useEffect, useState } from "react";
import { getAllUsers } from "@/services/userServices";
import type { IUser } from "../interfaces/interfaces";
import { PieChart, Pie, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

export default function EstadisticasPersonal() {
  const [usuarios, setUsuarios] = useState<IUser[]>([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState<IUser[]>([]);
  const [selectedDestino, setSelectedDestino] = useState<string>("TODOS");
  const [destinos, setDestinos] = useState<string[]>([]);
  const [selectedEstadistica, setSelectedEstadistica] =
    useState<string>("grados");

  const chartColors = [
    "#FF6B6B",
    "#FEC260",
    "#4ECDC4",
    "#1A535C",
    "#FFE66D",
    "#A29BFE",
    "#6C5CE7",
    "#00B894",
    "#FAB1A0",
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const users = await getAllUsers();
        setUsuarios(users);
        setFilteredUsuarios(users);

        const uniqueDestinos = Array.from(
          new Set(
            users.map((user) => user.destinoJbGrupos || "No especificado")
          )
        );
        setDestinos(uniqueDestinos);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (selectedDestino === "TODOS") {
      setFilteredUsuarios(usuarios);
    } else {
      setFilteredUsuarios(
        usuarios.filter((user) => user.destinoJbGrupos === selectedDestino)
      );
    }
  }, [selectedDestino, usuarios]);

  const agruparPorCampo = (usuarios: IUser[], campo: keyof IUser) => {
    const conteo: Record<string, number> = {};
    usuarios.forEach((user) => {
      const valor = user[campo] || "No especificado";
      conteo[valor as string] = (conteo[valor as string] || 0) + 1;
    });

    return Object.entries(conteo).map(([name, value], i) => ({
      name,
      value,
      color: chartColors[i % chartColors.length],
    }));
  };

  type ChartDataItem = {
    name: string;
    value: number;
    color: string;
  };

  const agruparCursosRealizados = (usuarios: IUser[]) => {
    const conteo: Record<string, number> = {};

    usuarios.forEach((user) => {
      user.cursosRealizados?.forEach((curso) => {
        const nombreCurso = curso.nombre || "Sin nombre";
        conteo[nombreCurso] = (conteo[nombreCurso] || 0) + 1;
      });
    });

    return Object.entries(conteo).map(([name, value], i) => ({
      name,
      value,
      color: chartColors[i % chartColors.length],
    }));
  };

  const nombresEstadisticas: Record<string, string> = {
    grados: "GRADO",
    sexo: "SEXO",
    especialidades: "ESPECIALIDAD",
    institutoDeFormacion: "INSTITUTO DE FORMACIÓN",
    destino: "DESTINO",
    grupoSanguineo: "GRUPO SANGUÍNEO",
    estadoCivil: "ESTADO CIVIL",
    formacionAcademica: "FORMACIÓN ACADÉMICA",
    destinadoEnLaUnidad: "DESTINADO EN LA UNIDAD",
    cursosRealizados: "CURSOS REALIZADOS",
  }

  

  const datos = {
    grados: agruparPorCampo(filteredUsuarios, "grado"),
    sexo: agruparPorCampo(filteredUsuarios, "sexo"),
    especialidades: agruparPorCampo(filteredUsuarios, "especialidad"),
    institutoDeFormacion: agruparPorCampo(filteredUsuarios, "institutoDeFormacion"),
    destino: agruparPorCampo(filteredUsuarios, "destinoJbGrupos"),
    grupoSanguineo: agruparPorCampo(filteredUsuarios, "grupoSanguineo"),
    estadoCivil: agruparPorCampo(filteredUsuarios, "estadoCivil"),
    formacionAcademica: agruparPorCampo(filteredUsuarios, "formacionAcademica"),
    destinadoEnLaUnidad: agruparPorCampo(filteredUsuarios,"destinadoEnLaUnidad"),
    cursosRealizados: agruparCursosRealizados(filteredUsuarios),
  };

  const renderDonutChart = (data: ChartDataItem[], title: string) => {
    return (
      <Card className="w-full">
        <CardHeader className="mb-1 pb-1 pt-2">

         <CardTitle className="text-xl">
  {selectedDestino !== "TODOS" ? (
    <>
      Distribución del personal de{" "}
      <span className="text-blue-700 font-semibold">{selectedDestino}</span>{" "}
      según <span className="text-blue-700 font-semibold">{title}</span>
    </>
  ) : (
    <>
     Distribución del personal según{" "}
      <span className="text-blue-700 font-semibold">{title}</span>
    </>
  )}
</CardTitle>


        </CardHeader>
        <CardContent className="">
          <div className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
            <ChartContainer
              config={data.reduce(
                (
                  acc: Record<string, { label: string; color: string }>,
                  item: ChartDataItem
                ) => {
                  acc[item.name] = {
                    label: item.name,
                    color: item.color,
                  };
                  return acc;
                },
                {}
              )}
            >
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius="50%"
                  outerRadius="78%"
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  labelLine={false}
                >
                  {data.map((entry, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {data.map((item: ChartDataItem, index: number) => (
              <div key={index} className="flex items-center">
                <div
                  className="mr-5 h-5 w-5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xl text-muted-foreground">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen py-6 pb-16 flex flex-col justify-center sm:py-12 bg-slate-800">
      <div className="relative py-3 sm:max-w-6xl sm:mx-auto px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-stone-100 shadow-lg sm:rounded-3xl sm:p-10">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Estadísticas del Personal
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 bg-white p-4 rounded-lg shadow-md border border-gray-200 h-fit">
              <div className="flex items-center gap-2 mb-3 text-blue-700 font-semibold">
                <Filter size={18} />
                <h2 className="text-lg">Filtros</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="estadistica-filter"
                    className="block text-lg font-medium text-gray-700 mb-1"
                  >
                    Estadística según:
                  </label>
                  <Select
                    value={selectedEstadistica}
                    onValueChange={(value) => setSelectedEstadistica(value)}
                  >
                    <SelectTrigger className="w-full bg-blue-50 border-blue-200">
                      <SelectValue placeholder="Seleccionar estadística" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(datos).map((key) => (
                        <SelectItem key={key} value={key}>
                          {nombresEstadisticas[key]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label
                    htmlFor="destino-filter"
                    className="block text-lg font-medium text-gray-700 mb-1"
                  >
                    Destino:
                  </label>
                  <Select
                    value={selectedDestino}
                    onValueChange={(value) => setSelectedDestino(value)}
                  >
                    <SelectTrigger className="w-full bg-blue-50 border-blue-200">
                      <SelectValue placeholder="Seleccionar destino" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TODOS">TODOS</SelectItem>
                      {destinos.map((destino) => (
                        <SelectItem key={destino} value={destino}>
                          {destino}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <p className="text-lg text-gray-500 mb-2">Estadísticas:</p>
                  <div className="bg-blue-50 text-blue-800 px-3 py-2 rounded-md font-medium text-sm">
                    {selectedDestino === "TODOS"
                      ? "Todos los destinos"
                      : selectedDestino}
                  </div>
                  <p className="text-lg text-blue-700 font-semibold mt-3 ">
                    Total de personal: {filteredUsuarios.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full">
              {renderDonutChart(datos[selectedEstadistica], nombresEstadisticas[selectedEstadistica])}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
