import {availableSlots,createBooking,cancelBooking} from "./scheduler.js";
const storageKey="appointment-studio-demo-v1";
const form=document.querySelector("#form"),date=document.querySelector("#date"),time=document.querySelector("#time"),message=document.querySelector("#message"),list=document.querySelector("#bookings");
const today=new Date();const localToday=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
date.min=localToday;date.value=localToday;
let bookings=[];
try{const saved=JSON.parse(localStorage.getItem(storageKey)||"[]");if(Array.isArray(saved))bookings=saved;}catch{bookings=[];}
function save(){localStorage.setItem(storageKey,JSON.stringify(bookings));}
function refresh(){
 time.replaceChildren();
 for(const slot of availableSlots(date.value,bookings)){const option=document.createElement("option");option.value=slot;option.textContent=slot;time.append(option);}
 if(!time.options.length){const option=document.createElement("option");option.textContent="No slots available";option.value="";time.append(option);}
 list.replaceChildren();
 if(!bookings.length){const p=document.createElement("p");p.textContent="No appointments yet.";list.append(p);}
 for(const booking of [...bookings].sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time))){
  const row=document.createElement("div");row.className="booking";
  const details=document.createElement("p");details.textContent=`${booking.date} at ${booking.time} — ${booking.name}`;
  const button=document.createElement("button");button.type="button";button.textContent="Cancel";button.setAttribute("aria-label",`Cancel appointment for ${booking.name} on ${booking.date} at ${booking.time}`);
  button.addEventListener("click",()=>{bookings=cancelBooking(bookings,booking.id);save();message.textContent="Appointment cancelled.";refresh();});
  row.append(details,button);list.append(row);
 }
}
date.addEventListener("change",()=>{message.textContent="";refresh();});
form.addEventListener("submit",event=>{event.preventDefault();try{if(date.value<localToday)throw Error("Select today or a future date");bookings=createBooking(bookings,{date:date.value,time:time.value,name:form.elements.name.value});save();message.textContent="Appointment booked on this device.";form.elements.name.value="";refresh();}catch(error){message.textContent=error.message;}});
refresh();
