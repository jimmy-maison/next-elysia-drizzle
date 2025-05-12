import { usersTable } from "@/db/schema/user";
import { db } from "@/lib/drizzle";
import { encrypt } from "@/lib/jwt";
import { authenticationSchema } from "@/lib/typebox/auth";
import { eq } from "drizzle-orm";
import Elysia, { InternalServerError } from "elysia";
import { cookies } from "next/headers";

export const authRoute = new Elysia({"prefix": "/auth"})
.post("/signup", async ({body}) => {
    const existingUser = await db.select().from(usersTable).where(eq(usersTable.username, body.username));

    if(existingUser.length) throw new InternalServerError("User already exists");
    
    const user = await db.insert(usersTable).values({
        username: body.username.trim(),
        password: body.password.trim(),
    }).returning();

    console.log(user);

    const cookie = {
        name: "auth",
        value: (await encrypt(user))!,
        path: "/",
        httpOnly: true,
      };
      console.log(cookie);
    (await cookies()).set(cookie);
}, {body: authenticationSchema})
.post("/signin", async ({body}) => {
    const user = await db.query.usersTable.findFirst({
        where: (
          eq(usersTable.username, body.username.trim()) &&
          eq(usersTable.password, body.password.trim())
        ),
      });

    if (!user) throw new InternalServerError("User not found or password incorrect");

    const cookie = {
      name: "auth",
      value: (await encrypt(user))!,
      path: "/",
      httpOnly: true,
    };

    (await cookies()).set(cookie);
}, {body: authenticationSchema})
.post("/signout", async () => {
    (await cookies()).delete("auth");
})
