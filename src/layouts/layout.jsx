import React from "react";
import { Sidenav, DashboardNavbar, Footer } from "@/widgets/layout";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <main>{children}</main>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
