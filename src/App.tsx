// src/App.tsx
import { Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { Toaster } from "./components/ui/sonner";

import PrivateRoute from "@/components/PrivateRoute";

import Login from "@/pages/Login";
import SignupPage from "@/pages/Signup";
import ErrorPage from "@/pages/ErrorPage";
import Settings from "@/pages/Settings";

import AdminPanel from "@/pages/AdminPanel";
import VerifyCodePage from "./VerifyCode";
import ResetPasswordPage from "./ResetPassword";
import ForgotPasswordPage from "./pages/ForgotPassword";

import AppLayout from "./layouts/AppLayout";
import MobileLayout from "./layouts/MobileLayout";

import MobileDashboard from "./pages/mobile/MobileDashboard";
import MobileServices from "./pages/mobile/MobileServices";
import MobileBookings from "./pages/mobile/MobileBookings";
import MobileProfile from "./pages/mobile/MobileProfile";

import CustumerDashboard from "./pages/client/CustumerDashboard";
import CustumerServices from "./pages/client/CustumerServices";
import CustumerBookings from "./pages/client/CustumerBookings";
import CustumerProfile from "./pages/client/CustumerProfile";
import CustumerSalons from "./pages/client/CustumerSalons";
import CustumerBook from "./pages/client/CustumerBook";

import SalonDetails from "./pages/SalonDetails";
import BookingDetails from "./pages/BookingDetails";
import PaymentMethods from "./pages/PaymentMethods";

import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManagerServices from "./pages/manager/ManagerServices";
import ManagerStaff from "./pages/manager/ManagerStaff";
import ManagerSchedule from "./pages/manager/ManagerSchedule";

import { useIsMobile } from "./hooks/use-mobile";
import ManagerCompany from "@/pages/manager/ManagerCompany";
import ManagerPlan from "./pages/manager/ManagerPlan";
import ManagerCategory from "./pages/manager/ManagerCategory";

export default function App() {
	const isMobile = useIsMobile();

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<AuthProvider>
				<DataProvider>
					<Toaster richColors position="top-right" />
					<Routes>
						{/* ====================== Páginas públicas ====================== */}
						<Route path="/" element={<Login />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="/unauthorized" element={<ErrorPage code={401} message="Acesso não autorizado" />} />
						<Route path="/service-unavailable" element={<ErrorPage code={503} message="Servidor fora de serviço. Tente novamente mais tarde." />} />
						<Route path="*" element={<ErrorPage code={404} message="Página não encontrada" />} />
						<Route path="/forgot-password" element={<ForgotPasswordPage />} />
						<Route path="/verify-code" element={<VerifyCodePage />} />
						<Route path="/reset-password" element={<ResetPasswordPage />} />

						{/* ====================== Dashboard privado ====================== */}
						<Route path="/dashboard" element={
							<PrivateRoute roles={["ADMIN", "MANAGER", "USER", "STAFF"]}>
								{isMobile ? <MobileLayout /> : <AppLayout />}
							</PrivateRoute>
						}>
							{/* ====================== Rotas para cliente ====================== */}
							<Route path="client" element={<Outlet />}>
								<Route index element={<CustumerDashboard />} />
								<Route path="services" element={<CustumerServices />} />
								<Route path="bookings" element={<CustumerBookings />} />
								<Route path="book" element={<CustumerBook />} />
								<Route path="salons" element={<CustumerSalons />} />
								<Route path="salon/:id" element={<SalonDetails />} />
								<Route path="bookings/:id" element={<BookingDetails />} />
								<Route path="pay" element={<PaymentMethods />} />
								<Route path="profile" element={<CustumerProfile />} />
								<Route path="settings" element={<PrivateRoute roles={["admin", "manager"]}><Settings /></PrivateRoute>} />
								<Route path="admin-panel" element={<PrivateRoute roles={["admin"]}><AdminPanel /></PrivateRoute>} />
							</Route>

							{/* ====================== Rotas para manager ====================== */}
							<Route path="manager" element={<Outlet />}>
								<Route index element={<ManagerDashboard />} />
								<Route path="plan" element={<ManagerPlan />} />
								<Route path="services" element={<ManagerServices />} />
								<Route path="category" element={<ManagerServices />} />
								<Route path="company" element={<ManagerCompany />} />
								<Route path="staff" element={<ManagerStaff />} />
								<Route path="schedule" element={<ManagerSchedule />} />
								{/* Repete algumas páginas de cliente se necessário */}
							</Route>

							{/* ====================== Rotas para staff ====================== */}
							<Route path="staff" element={<Outlet />}>
								<Route index element={<MobileDashboard />} />
								<Route path="services" element={<MobileServices />} />
								<Route path="bookings" element={<MobileBookings />} />
								<Route path="profile" element={<MobileProfile />} />
							</Route>

							{/* ====================== Rotas para admin ====================== */}
							<Route path="admin" element={<Outlet />}>
								<Route index element={<MobileDashboard />} />
								<Route path="admin-panel" element={<AdminPanel />} />
								<Route path="settings" element={<Settings />} />
							</Route>
						</Route>

						{/* ====================== Rotas exclusivas de manager/admin ====================== */}
						<Route path="/manager" element={
							<PrivateRoute roles={["manager", "admin"]}>
								{isMobile ? <MobileLayout /> : <AppLayout />}
							</PrivateRoute>
						}>
							<Route index element={<ManagerDashboard />} />
							<Route path="services" element={<ManagerServices />} />
							<Route path="staff" element={<ManagerStaff />} />
							<Route path="schedule" element={<ManagerSchedule />} />
							<Route path="category" element={<ManagerCategory />} />

						</Route>
					</Routes>
				</DataProvider>
			</AuthProvider>
		</ThemeProvider>
	);
}

/*
  ====================== Comentários importantes ======================
  1. Use Outlet para agrupar rotas de um mesmo tipo (client, manager, admin).
  2. isMobile controla se renderiza MobileLayout ou AppLayout.
  3. PrivateRoute garante que só usuários autenticados com os roles corretos acessem a rota.
  4. As páginas de dashboard mobile (MobileDashboard, MobileServices, etc.) são placeholders, substitua pelos componentes corretos.
  5. Lembre-se de criar os paths corretos no backend para todos os endpoints usados no frontend.
*/
