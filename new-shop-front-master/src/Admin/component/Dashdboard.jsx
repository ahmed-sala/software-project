import React from "react";
import Grid from "@mui/material/Grid";
import Achivement from "./Achivement";
import MonthlyOverview from "./MonthlyOverview";
import OrderTableView from "../view/OrderTableView";
import ProductsTable from "./ProductsTable";
import ProductTableView from "../view/ProductTableView";

const AdminDashboard = () => {
  return (
    <div className="p-10 ">
      <Grid container spacing={3}>
        <Grid className="shadow-lg shadow-gray-600" item xs={12} md={4}>
          <div className="shadow-lg shadow-gray-600">
            <Achivement />

          </div>

        </Grid>
        <Grid  item xs={12} md={8}>
          <div className="shadow-lg shadow-gray-600">
            <MonthlyOverview/>

          </div>
        </Grid>
        <Grid  item x5={12} md={6}>
          <div className="shadow-lg shadow-gray-600">
            <OrderTableView/>

          </div>
        </Grid>
        <Grid  item x5={12} md={6}>
          <div className="shadow-lg shadow-gray-600">
            <ProductTableView/>

          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default AdminDashboard;
