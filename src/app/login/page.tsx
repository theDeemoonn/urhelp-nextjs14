import AuthForm from "@/components/auth-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "../configs/auth";

export default async function Register() {
  const session = await getServerSession(authConfig);

  if (session) redirect("/");

  return <AuthForm />;
}