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
  const filePath = path.join(__dirname, 'index.html');
  try {
    const htmlContent = fs.readFileSync(filePath, 'utf8');
    return c.html(htmlContent);
  } catch (err) {
    console.error('Error reading the file:', err);
    return c.html('<h1>Internal Server Error</h1>', 500);
  }
});

const port = Number(process.env.PORT);
console.log(`Server is running on port ${port} well configured`)
try{
serve({
  fetch: app.fetch,
  port
})
}catch(error:any){
  console.log(error?.message)
}
