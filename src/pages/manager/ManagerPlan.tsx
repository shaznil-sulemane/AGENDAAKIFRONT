import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useData } from "@/hooks/useData";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Plan = {
  id: string;
  title: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  badge?: string;
};

export default function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<Plan[]>();
  const { getAllPlans, payPlan } = useData()

  const load = async () => {
    const res = await getAllPlans()
    setPlans(res)
  }

  useEffect(() => {
    load()
  }, [])

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) {
      toast.error("Selecione um plano antes de continuar");
      return;
    }
    setLoading(true);
    try {
      // Aqui você integra com o backend/PaySuite/Agendaki
      const res = await payPlan(selectedPlan);
      toast.success(`Você selecionou o plano: ${selectedPlan}`);
      console.log("Resposta do pagamento:", res.data);

      // toast.success("Redirecionando para o portal de pagamento..." + res.data.data);
      if(res.data && res.data.startsWith("http")) {
        window.location.href = res.data;
      }

    } catch (error: any) {
      toast.error(error.message || "Erro ao processar subscrição");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-8">
      <h1 className="text-4xl font-bold text-center mb-8">Escolha seu Plano</h1>
      <div className="grid xl:grid-cols-3 gap-6">
        {plans != undefined ? plans.map((plan) => (
          <Card
            key={plan.id}
            className={`border-2 w-full ${selectedPlan === plan.id ? "border-blue-500 shadow-lg" : "border-gray-200"} cursor-pointer transition`}
            onClick={() => handleSelectPlan(plan.id)}
          >
            <CardHeader className="flex flex-col items-start gap-2">
              {plan.badge && <span className="bg-green-400 text-white text-xs font-bold px-2 py-1 rounded">{plan.badge}</span>}
              <Label className="text-[1.2rem] font-bold text-green-500">{plan.title}</Label>
              <CardDescription className="text-gray-700 text-3xl">{Number(plan.price).toFixed(2)} {plan.duration.toLowerCase()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-gray-600">{plan.description}</p>
              <ul className="flex flex-col gap-1 mb-4">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="text-gray-700 flex gap-2"><Check className="text-green-500" /> {f}</li>
                ))}
              </ul>
              <Button className="w-full" onClick={handleSubscribe} disabled={loading}>
                {loading ? "Processando..." : "Subscrever meu negócio"}
              </Button>
            </CardContent>
          </Card>
        )) : []}
      </div>
    </div>
  );
}
