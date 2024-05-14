//Gak Penting

import React from "react";
import routes from "@/routes";
import { Sidenav, DashboardNavbar, Footer } from "@/widgets/layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export function Dashboard()  {
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Routes>
          {routes.map(({path, element}, index) => (
            <Route key={index} exath path={path} element={element}/>
          ))}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
