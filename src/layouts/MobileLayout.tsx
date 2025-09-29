import MobileFooter from "@/components/mobile/MobileFooter";
import MobileHeader from "@/components/mobile/MobileHeader";
import { Outlet } from "react-router-dom";


// Layout Mobile com navegação inferior
export default function MobileLayout() {
  return (
    <div className="flex flex-col h-screen">
      <MobileHeader />
      <div className="flex-1 overflow-y-auto pb-30 pt-20">
        <Outlet />
      </div>
      <MobileFooter />
    </div>
  );
}