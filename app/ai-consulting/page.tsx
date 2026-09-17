import { redirect } from "next/navigation";

/** The former standalone offer now belongs to the free assessment process. */
export default function FormerConsultingPage() {
  redirect("/audit");
}
