import { decrypt } from "@/lib/jwt";
import { Elysia, InternalServerError } from "elysia";
import { cookies } from "next/headers";
import { usersTable } from "@/db/schema/user";

export const userRoute = new Elysia({ prefix: "/user" }).get(
  "/current",
  async () => {
    const user = await decrypt<typeof usersTable.$inferSelect>(
      (await cookies()).get("auth")?.value,
    );

    if (!user) throw new InternalServerError("User not found");

    return user;
  },
);