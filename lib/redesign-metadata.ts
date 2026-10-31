import type { Metadata } from "next";
export const siteOrigin="https://flata-business.flata.chatgpt.site";
export const demoData=[
 {slug:"cleaning",brand:"Still & Shine",sector:"Cleaning"},
 {slug:"trades",brand:"Copperline Home",sector:"Home services"},
 {slug:"movers",brand:"Next Chapter",sector:"Moving"},
 {slug:"detailing",brand:"Obsidian Auto Studio",sector:"Auto detailing"},
 {slug:"catering",brand:"Gather & Grain",sector:"Events & catering"},
] as const;
export type IndustrySlug=typeof demoData[number]["slug"];
export const pageData:Record<string,[string,string]>={
 portfolio:["Industry demos","Explore five fictional business websites with complete service pages and interactive sample planners."],
 pricing:["Pricing & website care","USD600 website creation, USD100 monthly care, or USD300 total technology support including care."],
 about:["Our approach","Useful websites for independent businesses, with support after launch. Based in Kenya, working internationally."],
 contact:["Start a project","Tell Flata about your business, customers and website priorities by email."],
 support:["Ongoing support","Website maintenance, small content changes, fixes and scoped technology support."],
 privacy:["Privacy","How this website, its fictional demo tools and email enquiries handle information."],
 terms:["Service terms","Plain service notes for website creation and ongoing support. Every project requires a completed agreement."],
 "flata-business":["Business websites","Website design, creation and care for independent businesses."],
 "custom-software":["Scoped technology work","Manageable web tasks and workflow tools, with major software scoped separately."],
 "case-study":["Design concepts","Independent fictional website concepts with practical visitor journeys."],
};
export function pageMetadata(key:string):Metadata {
 const [title,description]=pageData[key];
 const image="/assets/"+(["portfolio","pricing","about","contact","support"].includes(key)?"og-"+key+".png":"flata-og-wide.png");
 return {title,description,alternates:{canonical:"/"+key+"/"},openGraph:{title:title+" | Flata Software",description,url:"/"+key+"/",images:[{url:image,width:1200,height:630}]},twitter:{card:"summary_large_image",title:title+" | Flata Software",description,images:[image]}};
}
export function demoMetadata(industry:typeof demoData[number],section?:string):Metadata {
 const label=section==="services"?"Services":section==="planner"?"Sample planner":"Fictional concept";
 const title=industry.brand+" | "+label;
 const description="An independent fictional "+industry.sector.toLowerCase()+" website concept by Flata. All sample tools are simulations; no enquiry, booking or payment is created.";
 const path="/demos/"+industry.slug+(section?"/"+section:"")+"/";const image="/assets/og-demo-"+industry.slug+".png";
 return {title:{absolute:title},description,robots:{index:false,follow:false},alternates:{canonical:path},openGraph:{title,description,url:path,images:[{url:image,width:1200,height:630}]},twitter:{card:"summary_large_image",title,description,images:[image]}};
}
