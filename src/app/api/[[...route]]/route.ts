import { authRoute } from "@/server/auth";
import { userRoute } from "@/server/user";
import { Elysia } from "elysia";

export const dynamic = "force-dynamic";

const app = new Elysia({ prefix: "/api", aot: false})
.use(authRoute)
.use(userRoute)

export type App = typeof app;

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
export const PATCH = app.handle;