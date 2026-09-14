import { notFound, permanentRedirect } from "next/navigation";
import { projects } from "@/lib/projects";
export default function ProjectPage({params}:{params:{slug:string}}){
 if(!projects.some(p=>p.slug===params.slug)) notFound();
 permanentRedirect("/work");
}
