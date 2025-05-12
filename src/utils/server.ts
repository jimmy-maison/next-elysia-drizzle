import { cookies, headers } from "next/headers";

export const setCookies = async () => {
  const cookieStore = await cookies();
  const cookie = ["auth"]
    .map((name) => {
      const value = cookieStore.get(name)?.value;
      return value ? `${name}=${value}` : "";
    })
    .filter(Boolean)
    .join("; ");

  return { $headers: { cookie } };
};
