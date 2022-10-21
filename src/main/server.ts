import express from "express";
import { customersRoutes } from "./routes/customers-routes";
import { itemsRoutes } from "./routes/items-routes";
import { ordersRouters } from "./routes/orders-routes";
import { sessionsRoutes } from "./routes/sessions-routes";

const app = express();

app.use(express.json());
app.use("/orders", ordersRouters);
app.use("/items", itemsRoutes);
app.use("/customers", customersRoutes);
app.use("/sessions", sessionsRoutes);

app.listen("3333", () => {
  console.log("Server is running on port 3333!");
});
