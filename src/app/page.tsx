import { redirect } from "next/navigation";

export default function Homepage() {
  redirect("/login");
  return null;
}