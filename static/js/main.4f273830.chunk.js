(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,function(e,t,r){e.exports=r(29)},,,,,,,,function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){},,,,,function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){"use strict";r.r(t);var a=r(1),n=r.n(a),c=r(8),o=r.n(c),i=(r(18),r(9)),l=r.n(i);r(19);var s=e=>{let{responses:t,currentResponseIndex:r,setCurrentResponseIndex:c}=e;Object(a.useEffect)(()=>{if(console.log("Current Index: ",r),console.log("Responses: ",t),t&&t.length>0&&t[r]){const e=t[r];if(console.log("Current Response: ",e),e&&e.description&&"No review"!==e.review){const a=50*e.description.length+1e3,n=setTimeout(()=>{let e=(r+1)%t.length;for(;"No review"===t[e].review&&e!==r;)e=(e+1)%t.length;c(e)},a);return()=>clearTimeout(n)}}},[r,t,c]);const o=t&&t[r];return n.a.createElement("div",{className:"typewriter-container"},o&&"No review"!==o.review&&n.a.createElement(l.a,{onInit:e=>{e.typeString("".concat(o.title,": ").concat(o.description)).callFunction(()=>{r===t.length-1&&c(0)}).start()},options:{delay:50,autoStart:!0,loop:!1}}))},u=r(31);var m=async function(e){const t="https://letterboxd.com/".concat(e,"/rss/");try{const e=await fetch(t),a=await e.text(),n=new DOMParser,c=n.parseFromString(a,"application/xml").querySelectorAll("item");return Array.from(c).filter(e=>!(e.querySelector("link")?e.querySelector("link").textContent:"").includes("/list/")).map(e=>{const t=(e.querySelector("title")?e.querySelector("title").textContent:"No title").split(",")[0],r=e.querySelector("*|memberRating")?e.querySelector("*|memberRating").textContent:"No rating",a=e.querySelector("*|watchedDate")?e.querySelector("*|watchedDate").textContent:"No date",c=e.querySelector("description")?e.querySelector("description").textContent:"No review",o=n.parseFromString(c,"text/html"),i=o.querySelectorAll("p"),l=Array.from(i).reduce((e,t)=>{const r=t.textContent.trim();return r&&!r.startsWith("Watched on")&&"No review"!==r&&e.push(r),e},[]);return{title:t,rating:r,review:l.length>0?l.join("\n"):"No review",imgSrc:o.querySelector("img")?o.querySelector("img").src:"No image",watchedDate:a}})}catch(r){return console.error("Failed to fetch RSS data:",r),[]}};r(20);var p=function(){return n.a.createElement("div",{className:"loading-container"},n.a.createElement("h2",null,"Loading, please wait..."),n.a.createElement("span",{className:"loader"}))};r(21);var d=e=>{let{onResponsesUpdate:t}=e;const[r,c]=Object(a.useState)(""),[o,i]=Object(a.useState)([]),[l,d]=Object(a.useState)(!1),[h,g]=Object(a.useState)(!0),[v,f]=Object(a.useState)(!1),[w,y]=Object(a.useState)(!1),[E,b]=Object(a.useState)(""),S=Object(a.useCallback)(async e=>{try{const a=e.map(async e=>{let t="";try{"No review"!==e.review&&(t=(await u.a.post("http://localhost:8000/chat",{prompt:"".concat(e.title," ").concat(e.rating," ").concat(e.review," You are a harsh movie critic. Write a sarcastic and mean quip making fun of the user about what they wrote. Make sure to provide the name of the movie you are making fun of to ensure proper context. Keep responses only up to 4 sentences.")})).data)}catch(r){console.error("Failed to send data to ChatGPT:",r),t="Failed to process the data for this entry."}return{imgSrc:e.imgSrc,title:e.title,review:e.review,rating:e.rating,watchedDate:e.watchedDate,description:t}}),n=await Promise.all(a);i(n),t(n)}catch(r){console.error("General error in sending data to ChatGPT:",r)}},[t]),x=Object(a.useCallback)(async()=>{if(r)try{const t=await m(r);t.length>0?(b(""),N(),setTimeout(()=>d(!0),500),await S(t)):b("Username not found.")}catch(e){console.error("Failed to fetch RSS data:",e),b("Failed to fetch data. Please check your connection and try again.")}finally{d(!1)}},[r,S]),N=()=>{y(!0),setTimeout(()=>{g(!1),f(!1)},500)};return n.a.createElement("div",null,h&&n.a.createElement("div",{className:"animate-input ".concat(w?"fadeOut":"")},n.a.createElement("div",null,n.a.createElement("h1",{id:"textbox"},"How Bad Is Your Movie Taste?"),n.a.createElement("h2",{id:"textbox"},"Our movie Artificial Intelligence will dissect and roast your horrible taste in film.")),n.a.createElement("button",{onClick:v?()=>x():()=>f(!0)},v&&r?"Submit":"Get Started"),v&&n.a.createElement("div",{className:"animate-input"},n.a.createElement("input",{placeholder:"Enter your Letterboxd username...",type:"text",value:r,onChange:e=>c(e.target.value),autoFocus:!0}))),l&&n.a.createElement(p,null),E&&n.a.createElement("h2",{className:"error-message"},E),!h&&n.a.createElement(s,{responses:o}))};r(26);var h=()=>n.a.createElement("footer",null,n.a.createElement("div",{className:"right"},n.a.createElement("a",{"aria-label":"GitHub",target:"_blank",rel:"noopener noreferrer",href:"https://github.com/AndreasBoscariol/CinemaCritic"},n.a.createElement("svg",{className:"main-social-svg",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},n.a.createElement("path",{d:"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"})))));r(27);var g=e=>{let{response:t=[],currentIndex:r}=e;const c=Object(a.useRef)([]);return c.current=t.map((e,t)=>{var r;return null!==(r=c.current[t])&&void 0!==r?r:n.a.createRef()}),Object(a.useEffect)(()=>{c.current[r]&&c.current[r].current&&c.current[r].current.scrollIntoView({behavior:"smooth",inline:"center"})},[r]),0===t.length?n.a.createElement("div",{className:"original-poster"},n.a.createElement("img",{src:"https://a.ltrbxd.com/resized/sm/upload/ji/5q/0k/rv/v6xrz4fr92KY1oNC3HsEvrsvR1n-0-2000-0-3000-crop.jpg?v=973d70bb0c",alt:"Seven Samurai"}),n.a.createElement("img",{src:"https://a.ltrbxd.com/resized/film-poster/5/1/7/0/0/51700-12-angry-men-0-2000-0-3000-crop.jpg?v=b8aaf291a9",alt:"12 Angry Men"}),n.a.createElement("img",{src:"https://a.ltrbxd.com/resized/film-poster/5/1/4/4/4/51444-pulp-fiction-0-2000-0-3000-crop.jpg?v=dee19a8077",alt:"Pulp Fiction"}),n.a.createElement("img",{src:"https://a.ltrbxd.com/resized/film-poster/2/6/9/0/2690-apocalypse-now-0-2000-0-3000-crop.jpg?v=d4f99c09a3",alt:"Apocalypse Now"})):n.a.createElement("div",{className:"image-container"},t.map((e,t)=>n.a.createElement("img",{key:t,ref:c.current[t],src:e.imgSrc,alt:e.title,className:t===r?"highlight":""})))};r(28);var v=()=>{const[e,t]=Object(a.useState)([]),[r,c]=Object(a.useState)(0);return n.a.createElement("div",{className:"App"},n.a.createElement(s,{responses:e,currentResponseIndex:r,setCurrentResponseIndex:c}),n.a.createElement(d,{onResponsesUpdate:t}),n.a.createElement("div",{id:"orange",className:"stripe"}),n.a.createElement("div",{id:"green",className:"stripe"}),n.a.createElement("div",{id:"blue",className:"stripe"}),n.a.createElement(g,{response:e,currentIndex:r}),n.a.createElement(h,null))};o.a.createRoot(document.getElementById("root")).render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(v,null)))}],[[10,1,2]]]);
//# sourceMappingURL=main.4f273830.chunk.js.map