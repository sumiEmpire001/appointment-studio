export const SLOT_MINUTES=30;
export function localDate(date){
 if(typeof date!=="string"||!/^(\d{4})-(\d{2})-(\d{2})$/.test(date))throw Error("Invalid date");
 const d=new Date(date+"T12:00:00Z");
 if(Number.isNaN(d.getTime())||d.toISOString().slice(0,10)!==date)throw Error("Invalid date");
 return date;
}
export function availableSlots(date,bookings=[],startHour=9,endHour=17){
 localDate(date);
 if(!Number.isInteger(startHour)||!Number.isInteger(endHour)||startHour<0||endHour>24||startHour>=endHour)throw Error("Invalid hours");
 const reserved=new Set(bookings.filter(b=>b.date===date).map(b=>b.time));
 const result=[];
 for(let minutes=startHour*60;minutes+SLOT_MINUTES<=endHour*60;minutes+=SLOT_MINUTES){
  const time=`${String(Math.floor(minutes/60)).padStart(2,"0")}:${String(minutes%60).padStart(2,"0")}`;
  if(!reserved.has(time))result.push(time);
 }
 return result;
}
export function createBooking(bookings,{date,time,name}){
 localDate(date);
 if(typeof name!=="string"||name.trim().length<2||name.trim().length>80)throw Error("Name must be 2–80 characters");
 if(!availableSlots(date,bookings).includes(time))throw Error("Slot unavailable");
 return [...bookings,{id:`booking-${Math.max(0,...bookings.map(b=>Number(String(b.id).replace("booking-",""))||0))+1}`,date,time,name:name.trim()}];
}
export function cancelBooking(bookings,id){return bookings.filter(b=>b.id!==id);}
