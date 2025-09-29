import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type ErrorPageProps = {
  code: number;
  message: string;
};

export default function ErrorPage({ code, message }: ErrorPageProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground gap-6 p-6">
      <h1 className="text-6xl font-bold text-primary">{code}</h1>
      <p className="text-xl text-muted-foreground text-center max-w-md">{message}</p>
      <Button onClick={() => navigate("/dashboard")}>Voltar para Home</Button>
    </div>
  );
}
