import getQueryClient from "@/lib/react-query";
import { rpc } from "@/lib/rpc";
import { setCookies } from "@/utils/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { redirect } from "next/navigation";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout(props: MainLayoutProps) {
  const queryClient = getQueryClient();

  const { data: user, error: unauthorized } = await rpc.api.user.current.get(
    await setCookies(),
  );

  if (unauthorized) redirect("/auth/signin");

  queryClient.setQueryData(["user"], user);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}