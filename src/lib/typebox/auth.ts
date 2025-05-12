import { TypeCompiler } from "@sinclair/typebox/compiler";
import { Type as t, type Static } from "@sinclair/typebox/type";

export const authenticationSchema = t.Object({
    username: t.String({ minLength: 1, maxLength: 128 }),
    password: t.String({ minLength: 1, maxLength: 128 }),
});

export const authenticationChecker = TypeCompiler.Compile(authenticationSchema);

export type AuthUser = Static<typeof authenticationSchema>;