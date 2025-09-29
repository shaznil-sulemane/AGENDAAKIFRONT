import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full p-6">
      <h1 className="text-4xl font-bold mb-4">🏠 Bem-vindo ao Meu App</h1>
      <p className="text-gray-600 mb-6">
        Esta é a página inicial pública. Faça login para acessar o Dashboard.
      </p>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    </div>
  );
}
