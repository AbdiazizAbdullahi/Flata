import type {Metadata} from "next";
import "./globals.css";
import "@/components/flata/demos.css";
export const dynamic="force-static";
export const metadata:Metadata={
 metadataBase:new URL("https://flata-business.flata.chatgpt.site"),
 title:{default:"Flata Software | Websites & ongoing care",template:"%s | Flata Software"},
 description:"Thoughtful websites and ongoing care for independent businesses. Based in Kenya, working internationally.",
 robots:{index:false,follow:false},authors:[{name:"Flata Software"}],
 icons:{icon:[{url:"/assets/flata-mark.svg",type:"image/svg+xml"},{url:"/assets/favicon-32.png",sizes:"32x32",type:"image/png"},{url:"/assets/favicon-16.png",sizes:"16x16",type:"image/png"}],shortcut:"/favicon.ico",apple:"/assets/apple-touch-icon.png"},
 manifest:"/site.webmanifest",alternates:{canonical:"/"},
 openGraph:{title:"Flata Software",description:"Thoughtful websites and ongoing care for independent businesses.",url:"/",siteName:"Flata Software",type:"website",images:[{url:"/assets/flata-og.png",width:1800,height:1200}]},
 twitter:{card:"summary_large_image",title:"Flata Software",description:"Thoughtful websites and ongoing care for independent businesses.",images:["/assets/flata-og-wide.png"]}
};
export const viewport={themeColor:"#F4F8F6"};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" style={{colorScheme:"light"}}><body>{children}</body></html>}
