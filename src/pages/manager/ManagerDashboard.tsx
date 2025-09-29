// src/pages/manager/ManagerDashboard.tsx
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Calendar, Users, DollarSign, TrendingUp, Clock, User, Star } from "lucide-react";
import { SelectTrigger } from "@radix-ui/react-select";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue } from "@/components/ui/select";
import { useData } from "@/hooks/useData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User as US } from "@/lib/types";

// chart
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
export const description = "A multiple line chart"

const chartData = [
  { dayOfWeek: "Domingo", pastWeek: 186, currentWeek: 80 },
  { dayOfWeek: "Segunda-feira", pastWeek: 305, currentWeek: 200 },
  { dayOfWeek: "Terça-feira", pastWeek: 250, currentWeek: 180 },
  { dayOfWeek: "Quarta-feira", pastWeek: 220, currentWeek: 150 },
  { dayOfWeek: "Quinta-feira", pastWeek: 237, currentWeek: 120 },
  { dayOfWeek: "Sexta-feira", pastWeek: 210, currentWeek: 160 },
  { dayOfWeek: "Sabado", pastWeek: 195, currentWeek: 130 },
]

const chartConfig = {
  pastWeek: {
    label: "Past Week",
    color: "var(--chart-1)",
  },
  currentWeek: {
    label: "Current Week",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig



const servicePerformance = [
  { service: "Corte Feminino", count: 120 },
  { service: "Barba", count: 90 },
  { service: "Manicure", count: 70 },
  { service: "Coloração", count: 50 },
];

const serviceChartConfig = {
  count: {
    label: "Número de Agendamentos",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const professionalPerformance = [
  { professional: "Carla Silva", count: 50 },
  { professional: "Pedro Costa", count: 40 },
  { professional: "Juliana Martins", count: 35 },
  { professional: "Lucas Lima", count: 30 },
];

const professionalChartConfig = {
  count: {
    label: "Número de Agendamentos",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const alerts = [
  { id: 1, message: "3 clientes VIP com reservas hoje" },
  { id: 2, message: "2 faturas a vencer" },
  { id: 3, message: "1 agendamento cancelado recentemente" },
];

export default function ManagerDashboard() {

  const navigate = useNavigate()

  const { getUser } = useAuth();
  const { salons, getSelectedSalon, setSelectedSalon } = useData();
  const [user, setUser] = useState<US | null>(getUser());
  const selectedSalon = getSelectedSalon();

  useEffect(() => {
    if (user) {
      if (!selectedSalon && salons && salons.length > 0) {
        setSelectedSalon(salons[0]);
      }
    } else {
      const u = getUser();
      setUser(u);
    }
  }, []);

  // Dados mockados para demonstração
  const stats = [
    { label: "Faturamento", value: "MTs 65,00", icon: DollarSign },
    { label: "Agendamentos Pendentes", value: "3", icon: Clock, change: "-1" },
    { label: "Agendamentos Cancelados", value: "2", icon: Calendar, change: "+1" },
    { label: "Avaliação", value: "5 estrelas", icon: Star },
  ];

  const upcomingAppointments = [
    { id: 1, client: "Maria Santos", service: "Corte Feminino", time: "14:00", professional: "Carla Silva" },
    { id: 2, client: "João Oliveira", service: "Barba", time: "14:30", professional: "Pedro Costa" },
    { id: 3, client: "Ana Pereira", service: "Manicure", time: "15:00", professional: "Juliana Martins" },
    { id: 4, client: "Ayrton", service: "Manicure", time: "15:00", professional: "Juliana Martins" },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Saudação */}
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">Resumo do seu negócio hoje</p>


        <div className="">

          <Select
            value={selectedSalon?.companyId || "new"} // "new" será o valor do botão criar nova
            onValueChange={(val) => {
              if (val === "new") {
                navigate("/dashboard/manager/company");
              } else {
                if (salons === null) return;
                const salon = salons.find(s => s.companyId === val);
                if (!salon) return;
                setSelectedSalon(salon);
              }
            }}
          >
            <SelectTrigger className="text-right p-2 shadow-md px-4 bg-green-500 text-[#ffffff]">
              <SelectValue placeholder="Selecione um salão">
                {selectedSalon ? selectedSalon.companyName : "Selecione um salão"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {salons && salons.length > 0 ? (
                <SelectGroup>
                  <SelectLabel>Salões</SelectLabel>
                  {salons.map((salon) => (
                    <SelectItem key={salon.companyId} value={salon.companyId}>
                      {salon.companyName}
                    </SelectItem>
                  ))}
                  <SelectItem value="new" className="text-blue-600 font-medium">
                    + Criar nova empresa
                  </SelectItem>
                </SelectGroup>
              ) : (
                <SelectGroup>
                  <SelectItem value="new" className="text-blue-600 font-medium">
                    + Criar nova empresa
                  </SelectItem>
                </SelectGroup>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="flex flex-col-reverse xl:grid xl:grid-cols-2 gap-3">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="p-4 bg-white border-1 shadow-md">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                    {/* <p className="text-xs text-green-600">{stat.change}</p> */}
                  </div>
                  <div className="p-2 bg-white shadow-md rounded-full">
                    <Icon className="h-4 w-4 text-primary" color="#00c951" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="shadow-md py-4 border-1">

          <CardHeader>
            <CardTitle>Comparação</CardTitle>
            <CardDescription>Semana passada vs. está semana</CardDescription>
          </CardHeader>
          <CardContent className="pt-2 h-auto">
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="dayOfWeek"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line
                  dataKey="pastWeek"
                  type="monotone"
                  stroke="#333333"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="currentWeek"
                  type="monotone"
                  stroke="#00c951"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 leading-none font-medium">
                  Receita maior que a semana passada <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-muted-foreground flex items-center gap-2 leading-none">
                  Mostrando total de agendamentos feitos nesta semana
                </div>
              </div>
            </div>
          </CardFooter>
        </div>
      </div>

      {/* Próximos agendamentos */}
      <div className="w-full grid xl:grid-cols-2 gap-3">

        <div className="space-y-6">
          <p className="text-muted-foreground">Próximos agendamentos</p>

          <div className="space-y-3">
            {upcomingAppointments.map((appt) => (
              <Card key={appt.id}>
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{appt.client}</h3>
                      <p className="text-sm text-muted-foreground">{appt.service}</p>
                      <div className="flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        <span className="text-xs">{appt.time}</span>
                        <span className="mx-2">•</span>
                        <User className="w-3 h-3 mr-1" />
                        <span className="text-xs">{appt.professional}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Ações rápidas */}
          <div className="grid grid-cols-2 gap-3">
            <Button className="h-16 bg-[#00c951] hover:bg-[#00b448] text-white">
              <Calendar className="mr-2 h-4 w-4" />
              Nova Reserva
            </Button>
            <Button className="h-16 bg-[#efefef] hover:bg-[#e0e0e0] text-gray-900">
              <Users className="mr-2 h-4 w-4" />
              Gerenciar Equipe
            </Button>
          </div>
        </div>



        <div className="space-y-3">

          {/* Performance de serviços */}
          <Card>
            <CardHeader>
              <CardTitle>Serviços mais populares</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={serviceChartConfig}>
                <BarChart accessibilityLayer data={servicePerformance}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="service"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="count" fill="#00c951" radius={8} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Performance de profissionais */}
          <Card>
            <CardHeader>
              <CardTitle>Profissionais mais ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={professionalChartConfig}>
                <BarChart accessibilityLayer data={professionalPerformance}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="professional"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="count" fill="#00c951" radius={8} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Alertas */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Alertas</h2>
            <div className="space-y-3">
              {alerts.map(alert => (
                <Card key={alert.id} className="bg-yellow-50 border-yellow-300">
                  <CardContent>{alert.message}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}