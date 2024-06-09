import { pgTable, date, integer, text, serial, decimal, boolean, varchar } from 'drizzle-orm/pg-core';
import { relations } from "drizzle-orm";

// users table no. 1
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  contact_phone: varchar("contact_phone", { length: 12 }).notNull(),
  phone_verified: boolean("contact_verified"),
  email: varchar("email", { length: 100 }).notNull(),
  email_verified: boolean("email_verified"),
  confirmation_code: varchar("confirmation_code", { length: 10 }),
  password: varchar("password", { length: 100 }).notNull(),
  created_at: date("created_at"),
  updated_at: date("updated_at")
});

// drivers table no. 2
export const driversTable = pgTable('drivers', {
  id: serial('id').primaryKey(),
  car_make: varchar('car_make', { length: 255 }).notNull(),
  car_model: varchar('car_model', { length: 255 }).notNull(),
  car_year: integer('car_year').notNull(),
  user_id: integer('user_id').references(() => usersTable.id, { onDelete: 'cascade' }).notNull(),
  online: boolean('online').notNull(),
  delivering: boolean('delivering').notNull(),
  created_at: date('created_at'),
  updated_at: date('updated_at'),
});

// state table no. 3
export const stateTable = pgTable('state', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  code: varchar('code', { length: 50 }).notNull(),
});

// city table
export const cityTable = pgTable('city', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  state_id: integer('state_id').references(() => stateTable.id, { onDelete: 'cascade' }).notNull(),
});

// restaurant table no. 4
export const restaurantTable = pgTable('restaurant', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  street_address: varchar('street_address', { length: 100 }).notNull(),
  zip_code: varchar('zip_code', { length: 20 }).notNull(),
  city_id: integer('city_id').references(() => cityTable.id, { onDelete: 'cascade' }).notNull(),
  created_at: date('created_at'),
  updated_at: date('updated_at'),
});

// category table no. 5
export const categoryTable = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
});

// menu items table no. 6
export const menuItemsTable = pgTable("menu_item", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  restaurant_id: integer("restaurant_id").references(() => restaurantTable.id, { onDelete: 'cascade' }).notNull(),
  category_id: integer("category_id").references(() => categoryTable.id, { onDelete: 'cascade' }).notNull(),
  description: text("description"),
  ingredients: text('ingredients'),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  active: boolean("active"),
  created_at: date('created_at'),
  updated_at: date('updated_at'),
});

// address table no. 7
export const addressTable = pgTable("address", {
  id: serial("id").primaryKey(),
  street_address_1: varchar("street_address_1", { length: 100 }),
  street_address_2: varchar("street_address_2", { length: 100 }),
  zip_code: varchar("zip_code", { length: 20 }),
  delivery_instructions: text("delivery_instructions"),
  user_id: integer("user_id").references(() => usersTable.id, { onDelete: 'cascade' }),
  city_id: integer("city_id").references(() => cityTable.id, { onDelete: 'cascade' }),
 created_at: date('created_at'),
  updated_at: date('updated_at'),
});

// restaurant owner table no. 8
export const restaurantOwnerTable = pgTable("restaurant_owner", {
  id: serial("id").primaryKey(),
  restaurant_id: integer("restaurant_id").references(() => restaurantTable.id, { onDelete: "cascade" }).notNull(),
  owner_id: integer("owner_id").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
});

// orders table no. 9
export const ordersTable = pgTable('orders', {
  id: serial('id').primaryKey().notNull(),
  restaurant_id: integer('restaurant_id').references(() => restaurantTable.id, { onDelete: 'cascade' }).notNull(),
  estimated_delivery_time: date('estimated_delivery_time').notNull(),
  actual_delivery_time: date('actual_delivery_time'),
  delivery_address_id: integer('delivery_address_id').references(() => addressTable.id, { onDelete: 'cascade' }).notNull(),
  user_id: integer('user_id').references(() => usersTable.id, { onDelete: 'cascade' }).notNull(),
  driver_id: integer('driver_id').references(() => driversTable.id, { onDelete: 'cascade' }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  discount: decimal('discount', { precision: 10, scale: 2 }).notNull(),
  final_price: decimal('final_price', { precision: 10, scale: 2 }).notNull(),
 created_at: date('created_at'),
  updated_at: date('updated_at'),
});

// comments table no. 10
export const commentsTable = pgTable('comments', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id').references(() => ordersTable.id, { onDelete: 'cascade' }).notNull(),
  user_id: integer('user_id').references(() => usersTable.id, { onDelete: 'cascade' }).notNull(),
  comment_text: text('comment_text').notNull(),
 created_at: date('created_at'),
  updated_at: date('updated_at'),
});

// status catalog table no. 11
export const statusCatalogTable = pgTable('status_catalog', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  order_status: varchar('order_status', { length: 255 }).notNull(),
});

// orders status table no. 12
export const ordersStatusTable = pgTable('orders_status', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id').references(() => ordersTable.id, { onDelete: 'cascade' }).notNull(),
  status_id: integer('status_id').references(() => statusCatalogTable.id, { onDelete: 'cascade' }).notNull(),
 created_at: date('created_at'),
  updated_at: date('updated_at'),
});

// order menu item table no. 13
export const orderMenuItemTable = pgTable('order_menu_item', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id').references(() => ordersTable.id, { onDelete: 'cascade' }).notNull(),
  menu_item_id: integer('menu_item_id').references(() => menuItemsTable.id, { onDelete: 'cascade' }).notNull(),
  quantity: integer('quantity').notNull(),
 created_at: date('created_at'),
  updated_at: date('updated_at'),
});


// Relationships
export const usersRelations = relations(usersTable, ({ many }) => ({
  addresses: many(addressTable),
  drivers: many(driversTable),
  orders: many(ordersTable),
  comments: many(commentsTable),
  restaurantOwners: many(restaurantOwnerTable),
}));

export const driversRelations = relations(driversTable, ({ one,many }) => ({
  user: one(usersTable, {
    fields: [driversTable.user_id],
    references: [usersTable.id],
  }),
  orders: many(ordersTable),
}));

export const stateRelations = relations(stateTable, ({ many }) => ({
  cities: many(cityTable),
}));

export const cityRelations = relations(cityTable, ({ one, many }) => ({
  state: one(stateTable, {
    fields: [cityTable.state_id],
    references: [stateTable.id],
  }),
  addresses: many(addressTable),
  restaurants: many(restaurantTable),
}));

export const restaurantRelations = relations(restaurantTable, ({ one, many }) => ({
  city: one(cityTable, {
    fields: [restaurantTable.city_id],
    references: [cityTable.id],
  }),
  menuItems: many(menuItemsTable),
  orders: many(ordersTable),
  restaurantOwners: many(restaurantOwnerTable),
}));

export const categoryRelations = relations(categoryTable, ({ many }) => ({
  menuItems: many(menuItemsTable),
}));

export const menuItemsRelations = relations(menuItemsTable, ({ one, many }) => ({
  restaurant: one(restaurantTable, {
    fields: [menuItemsTable.restaurant_id],
    references: [restaurantTable.id],
  }),
  category: one(categoryTable, {
    fields: [menuItemsTable.category_id],
    references: [categoryTable.id],
  }),
  orderMenuItems: many(orderMenuItemTable),
}));

export const addressRelations = relations(addressTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [addressTable.user_id],
    references: [usersTable.id],
  }),
  city: one(cityTable, {
    fields: [addressTable.city_id],
    references: [cityTable.id],
  }),
  orders: many(ordersTable),
}));

export const restaurantOwnerRelations = relations(restaurantOwnerTable, ({ one }) => ({
  restaurant: one(restaurantTable, {
    fields: [restaurantOwnerTable.restaurant_id],
    references: [restaurantTable.id],
  }),
  owner: one(usersTable, {
    fields: [restaurantOwnerTable.owner_id],
    references: [usersTable.id],
  }),
}));

export const ordersRelations = relations(ordersTable, ({ one, many }) => ({
  restaurant: one(restaurantTable, {
    fields: [ordersTable.restaurant_id],
    references: [restaurantTable.id],
  }),
  deliveryAddress: one(addressTable, {
    fields: [ordersTable.delivery_address_id],
    references: [addressTable.id],
  }),
  user: one(usersTable, {
    fields: [ordersTable.user_id],
    references: [usersTable.id],
  }),
  driver: one(driversTable, {
    fields: [ordersTable.driver_id],
    references: [driversTable.id],
  }),
  comments: many(commentsTable),
  orderStatus: many(ordersStatusTable),
  orderMenuItems: many(orderMenuItemTable),
}));

export const commentsRelations = relations(commentsTable, ({ one }) => ({
  order: one(ordersTable, {
    fields: [commentsTable.order_id],
    references: [ordersTable.id],
  }),
  user: one(usersTable, {
    fields: [commentsTable.user_id],
    references: [usersTable.id],
  }),
}));

export const statusCatalogRelations = relations(statusCatalogTable, ({ many }) => ({
  orderStatus: many(ordersStatusTable),
}));

export const ordersStatusRelations = relations(ordersStatusTable, ({ one }) => ({
  order: one(ordersTable, {
    fields: [ordersStatusTable.order_id],
    references: [ordersTable.id],
  }),
  status: one(statusCatalogTable, {
    fields: [ordersStatusTable.status_id],
    references: [statusCatalogTable.id],
  }),
}));

export const orderMenuItemRelations = relations(orderMenuItemTable, ({ one }) => ({
  order: one(ordersTable, {
    fields: [orderMenuItemTable.order_id],
    references: [ordersTable.id],
  }),
  menuItem: one(menuItemsTable, {
    fields: [orderMenuItemTable.menu_item_id],
    references: [menuItemsTable.id],
  }),
}));

// user table
export type UserSelect=typeof usersTable.$inferSelect
export type userInsert=typeof usersTable.$inferInsert

// city table
export type CitySelect=typeof cityTable.$inferSelect
export type CityInsert=typeof cityTable.$inferInsert

// state table
export type StateSelect=typeof stateTable.$inferSelect
export type StateInsert=typeof stateTable.$inferInsert

// restaurant table
export type RestaurantSelect=typeof restaurantTable.$inferSelect
export type RestaurantInsert=typeof restaurantTable.$inferInsert

//category table
export type CategorySelect=typeof categoryTable.$inferSelect
export type CategoryInsert=typeof categoryTable.$inferInsert

// address table
export type AddressSelect=typeof addressTable.$inferSelect
export type AddressInsert=typeof addressTable.$inferInsert

// comments table
export type CommentSelect=typeof commentsTable.$inferSelect
export type CommentInsert=typeof commentsTable.$inferInsert

// driver table
export type DriverSelect=typeof driversTable.$inferSelect
export type DriverInsert=typeof driversTable.$inferInsert

//menu_items table
export type MenuItemSelect=typeof menuItemsTable.$inferSelect
export type MenuItemInsert=typeof menuItemsTable.$inferInsert

// orders menu table
export type OrderMenuSelect = typeof orderMenuItemTable.$inferSelect
export type OrderMenuInsert=typeof orderMenuItemTable.$inferInsert

// order status menu
export type OrderStatusSelect=typeof ordersStatusTable.$inferSelect
export type OrderStatusInsert=typeof ordersStatusTable.$inferInsert

//order table
export type OrderSelect=typeof ordersTable.$inferSelect
export type OrderInsert=typeof ordersTable.$inferInsert

// restaurant owner table
export type RestaurantOwnerSelect=typeof restaurantOwnerTable.$inferSelect
export type RestaurantOwnerInsert=typeof restaurantOwnerTable.$inferInsert

// status catalog table
export type StatusCatalogSelect=typeof statusCatalogTable.$inferSelect
export type StatusCatalogInsert=typeof statusCatalogTable.$inferInsert