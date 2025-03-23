"use client";

import { useEffect, useState } from "react";
import { getAllUsers } from "../services/userServices";
import { IUser } from "./interfaces/interfaces";
import { PieChart, Pie, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default function EstadisticasPersonal() {
    const [usuarios, setUsuarios] = useState<IUser[]>([]);



  useEffect(() => {
    const getData = async () => {
      try {
        const users = await getAllUsers();
        setUsuarios(users);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    getData();
  }, []);

  const agruparPorCampo = (usuarios:IUser[], campo: keyof IUser) => {
    const conteo: Record<string, number> = {};
    usuarios.forEach((user) => {
      const valor = user[campo] || "No especificado";
      conteo[valor as string] = (conteo[valor as string] || 0) + 1;
    });

    return Object.entries(conteo).map(([name, value], i) => ({
      name,
      value,
      color: `hsl(var(--chart-${(i % 7) + 1}))`,
    }));
  };

  const datosGrado = agruparPorCampo(usuarios, "grado");
  const datosSexo = agruparPorCampo(usuarios, "sexo");
  const datosEspecialidad = agruparPorCampo(usuarios, "especialidad");
  const datosInstitutoDeFormacion = agruparPorCampo(usuarios, "institutoDeFormacion");
  const destino = agruparPorCampo(usuarios, "destinoJbGrupos");
  const grupoSanguineo = agruparPorCampo(usuarios, "grupoSanguineo");
  const estadoCivil = agruparPorCampo(usuarios, "estadoCivil");
  const formacionAcademica = agruparPorCampo(usuarios, "formacionAcademica");
  const destinadoEnLaUnidad = agruparPorCampo(usuarios, "destinadoEnLaUnidad");

  type ChartDataItem = {
    name: string;
    value: number;
    color: string;
  };

  const renderDonutChart = (data: ChartDataItem[], title:string) => {
    return (
      <Card className="w-full">
        <CardHeader className="mb-1 pb-1 pt-2">
        <CardTitle className="capitalize text-xl"> Distribución del personal según {title.replace(/([A-Z])/g, ' $1').toLowerCase()}</CardTitle>
        </CardHeader >
        <CardContent className="">
        <div className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
  <ChartContainer
    config={data.reduce((acc: Record<string, { label: string; color: string }>, item:ChartDataItem) => {
      acc[item.name] = {
        label: item.name,
        color: item.color,
      };
      return acc;
    }, {})}
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
//           label={({ name, percent, x, y }) => (
//             <text
//                  x={x}
//                  y={y}
//                  fill="#1f2937" // texto gris oscuro
//                  fontSize={16}
//                  fontWeight="bold"
//                  fontFamily="sans-serif"
//                  textAnchor="middle"
//                  dominantBaseline="central"
//                  >
//                  {`${name}: ${(percent * 100).toFixed(0)}%`}
//              </text>
//           )}
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
            {data.map((item: ChartDataItem, index:number) => (
              <div key={index} className="flex items-center">
                <div
                  className="mr-5 h-5 w-5 rounded-full "
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

          <Tabs defaultValue="grados" className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 p-4 min-h-[100px] text-sm sm:text-base md:text-lg overflow-x-auto">



              <TabsTrigger className="text-sm sm:text-lg" value="grados">Grado</TabsTrigger>
              <TabsTrigger className="text-sm sm:text-lg" value="sexo">Sexo</TabsTrigger>
              <TabsTrigger className="text-sm sm:text-lg" value="especialidades">Especialidad</TabsTrigger>
              <TabsTrigger className="text-sm sm:text-lg" value="institutoDeFormacion">Instituto de Formación</TabsTrigger>
              <TabsTrigger className="text-sm sm:text-lg" value="destino">Destino</TabsTrigger>
              <TabsTrigger className="text-sm sm:text-lg" value="grupoSanguineo">Grupo Sanguíneo</TabsTrigger>
              <TabsTrigger className="text-sm sm:text-lg" value="estadoCivil">Estado Civil</TabsTrigger>
              <TabsTrigger className="text-sm sm:text-lg" value="formacionAcademica">Formación Académica</TabsTrigger>
              <TabsTrigger className="text-sm sm:text-lg" value="destinadoEnLaUnidad">Destinado en la Unidad</TabsTrigger>
            </TabsList>

            <TabsContent value="grados">
              {renderDonutChart(datosGrado, "Grados")}
            </TabsContent>

            <TabsContent value="sexo">
              {renderDonutChart(datosSexo, "Sexo")}
            </TabsContent>

            <TabsContent value="especialidades">
              {renderDonutChart(datosEspecialidad, "Especialidades")}
            </TabsContent>

            <TabsContent value="institutoDeFormacion">
              {renderDonutChart(datosInstitutoDeFormacion, "institutoDeFormacion")}
            </TabsContent>

            <TabsContent value="destino">
              {renderDonutChart(destino, "Destino")}
            </TabsContent>

            <TabsContent value="grupoSanguineo">
              {renderDonutChart(grupoSanguineo, "grupoSanguineo")}
            </TabsContent>

            <TabsContent value="estadoCivil">
              {renderDonutChart(estadoCivil, "estadoCivil")}
            </TabsContent>
            
            <TabsContent value="formacionAcademica">
              {renderDonutChart(formacionAcademica, "formacionAcademica")}
            </TabsContent>

            <TabsContent value="destinadoEnLaUnidad">
              {renderDonutChart(destinadoEnLaUnidad, "destinadoEnLaUnidad")}
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  );
}
