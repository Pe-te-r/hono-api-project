import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { stateRoute } from './states/state.route'
import { cityRoute } from './cities/cities.route'
import { RouteRestaurant } from './restaurant/restaurant.route'
import { userRoute } from './users/user.route'
import { driverRoute } from './driver/driver.route'
import { addressRoute } from './address/address.route'
import { categoryRoute } from './category/category.route'
import { commentRoute } from './comment/comment.route'
import { menu_itemRoute } from './menu_item/menu_item.route'
import { ordersRoute } from './orders/orders.route'
import { OrderStatusRoute } from './order_status/order_status.route'
import { restaurantOwnersRoute } from './restaurant_owner/restaurant_owner.route'
import { order_menuRoute } from './order_menu_item/order_menu_item.route'
import { statusCatalogsRoute } from './status_catalog/status_catalog.route'
import * as fs from 'fs';
import * as path from 'path';





const app = new Hono()

app.route("/user",userRoute)
app.route("/state",stateRoute)
app.route("/city",cityRoute)
app.route("restaurant",RouteRestaurant)
app.route("/driver",driverRoute)
app.route("/address",addressRoute)
app.route("/category",categoryRoute)
app.route("/comment",commentRoute)
app.route("/menu",menu_itemRoute)
app.route("/order",ordersRoute)
app.route("/orderStatus",OrderStatusRoute)
app.route("restaurantOwner",restaurantOwnersRoute)
app.route("orderMenu",order_menuRoute)
app.route("statusCatalog",statusCatalogsRoute)
app.get('/', (c) => {
  try {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Restaurant Documentation</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f8f9fa;
      color: #333;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .container {
      text-align: center;
      padding: 2rem;
      background-color: #ffffff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }
    h1 { 
      color: #007bff;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
    }
    .signature {
      font-style: italic;
      margin-top: 2rem;
      color: #555;
    }
    .coming-soon {
      font-size: 1rem;
      color: #dc3545;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to My Restaurant Documentation Page</h1>
    <p>Hi, I'm Peter.</p>
    <p class="coming-soon">We are working on writing a better documentation which is coming soon. Please be patient and sorry for the inconvenience caused.</p>
    <p class="signature">- Phantom</p>
  </div>
</body>
</html>
    `
    return c.html(htmlContent);
  } catch (err) {
    console.error('Error reading the file:', err);
    return c.html('<h1>Internal Server Error</h1>', 500);
  }
});

const port =8000;
console.log(`Server is running on port ${port} well configured`)
try{
serve({
  fetch: app.fetch,
  port
})
}catch(error:any){
  console.log(error?.message)
}
