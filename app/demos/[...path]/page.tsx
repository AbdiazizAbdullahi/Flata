import {notFound} from "next/navigation";
import {DemoPage} from "@/components/flata/Demos";
import {demoData,demoMetadata} from "@/lib/redesign-metadata";
import {StandaloneSite} from "@/components/flata/StandaloneSite";
export const dynamicParams=false;
export function generateStaticParams(){return demoData.flatMap(i=>[{path:[i.slug]},{path:[i.slug,"services"]},{path:[i.slug,"planner"]}])}
type Props={params:Promise<{path:string[]}>};
function resolve(path:string[]){const industry=demoData.find(i=>i.slug===path[0]);if(!industry||path.length>2||(path[1]&&!['services','planner'].includes(path[1])))notFound();return industry}
export async function generateMetadata({params}:Props){const {path}=await params;const industry=resolve(path);if(industry.slug==="catering")return {title:{absolute:"Gather & Grain"},description:"Seasonal catering and considered gatherings.",robots:{index:false,follow:false},alternates:{canonical:"https://gather-and-grain.flata.chatgpt.site/"}};if(industry.slug==="detailing")return {title:{absolute:"Obsidian Auto Studio"},description:"A considered approach to automotive care.",robots:{index:false,follow:false},alternates:{canonical:"https://obsidian-auto-studio.flata.chatgpt.site/"}};return demoMetadata(industry,path[1])}
export default async function Page({params}:Props){const {path}=await params;const industry=resolve(path);if(industry.slug==="catering"){const destination="https://gather-and-grain.flata.chatgpt.site/"+(path[1]==="planner"?"plan/":path[1]==="services"?"menus/":"");return <StandaloneSite destination={destination}/>};if(industry.slug==="detailing"){const destination="https://obsidian-auto-studio.flata.chatgpt.site/"+(path[1]==="planner"?"configure/":path[1]==="services"?"treatments/":"");return <StandaloneSite destination={destination} brand="Obsidian Auto Studio"/>};return <DemoPage slug={industry.slug} section={path[1]}/>}
