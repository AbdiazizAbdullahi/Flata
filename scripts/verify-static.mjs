import {existsSync,readFileSync,readdirSync} from 'node:fs';
import {join,relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../out/',import.meta.url));
const failures=[], files=[], assets=[];
function walk(directory){
  for(const entry of readdirSync(directory,{withFileTypes:true})){
    const path=join(directory,entry.name);
    if(entry.isDirectory())walk(path);
    else {assets.push(path);if(entry.name.endsWith('.html'))files.push(path);}
  }
}
walk(root);
const industries=['cleaning','trades','movers','detailing','catering'];
const demoRoutes=industries.flatMap(slug=>[`demos/${slug}`,`demos/${slug}/services`,`demos/${slug}/planner`]);
const routes=['','portfolio','pricing','contact','about','support','terms','privacy','flata-business','custom-software','case-study','demos',...demoRoutes];
for(const route of routes)if(!existsSync(join(root,route,'index.html')))failures.push('Missing route '+route);
for(const file of files){
  const html=readFileSync(file,'utf8'), label=relative(root,file);
  if(!/<html[^>]*lang="en"/.test(html))failures.push(label+': language');
  if(!/<title>.+<\/title>/.test(html))failures.push(label+': title');
  if(!/<meta name="robots" content="[^"]*noindex/.test(html))failures.push(label+': private noindex metadata');
  for(const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)){
    const url=match[1].replaceAll('&amp;','&').split(/[?#]/)[0];
    if(!url.startsWith('/')||url.startsWith('//'))continue;
    const path=join(root,decodeURIComponent(url));
    if(!existsSync(path)&&!existsSync(path+'.html')&&!existsSync(join(path,'index.html')))failures.push(label+': broken '+url);
  }
  if(/254700000000|hello@flata\.co\.ke|KSh 100,000|KSh 20,000|KES 25,000/.test(html))failures.push(label+': obsolete/placeholder offer');
  if(/funnel\.sqlite|tracker-template|seed-leads|ATTEMPT_ID/.test(html))failures.push(label+': private data reference');
  if(label.startsWith('demos/catering/')){
    if(!html.includes('https://gather-and-grain.flata.chatgpt.site/'))failures.push(label+': standalone destination missing');
    if(html.includes('concept-planner-form'))failures.push(label+': embedded catering planner remains');
  } else if(label.startsWith('demos/detailing/')){
    if(!html.includes('https://obsidian-auto-studio.flata.chatgpt.site/'))failures.push(label+': standalone destination missing');
    if(html.includes('concept-planner-form'))failures.push(label+': embedded detailing planner remains');
  } else if(label.startsWith('demos/')&&label!=='demos/index.html'){
    if(!html.includes('fictional concept by Flata Software')||!html.includes('nothing is sent, stored, booked or paid'))failures.push(label+': simulation disclosure');
    if(/type="(?:email|text|tel)"|<textarea|action="https?:/.test(html))failures.push(label+': unexpected personal-data input');
    if(!/<script[^>]+src="\/_next\/static\//.test(html))failures.push(label+': interactive runtime missing');
  }
}
const home=readFileSync(join(root,'index.html'),'utf8');
if(!home.includes('framework-hero.webp')||!home.includes('Next website stage')||!/<script[^>]+src="\/_next\/static\//.test(home))failures.push('Homepage assets or interactive runtime missing');
if(assets.some(path=>/\.(mp4|webm|mov|m4v)$/i.test(path))||files.some(file=>/<video\b/i.test(readFileSync(file,'utf8'))))failures.push('Unexpected video media');
if(!readFileSync(join(root,'robots.txt'),'utf8').includes('Disallow: /'))failures.push('Private robots policy missing');
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
console.log(`PASS: ${files.length} HTML files; 9 embedded demo pages and 6 standalone entry routes; local links/assets; hydration; no personal demo inputs or video; private noindex policy.`);
