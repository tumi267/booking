export const generateTimeSlots = async(start: string, end: string, interval: number,providerId:string,date:Date|string,groupId: string): Promise<string[]> => {
    const bookedProvidertime = await getProviderbookings(providerId, date, groupId);

    const busyTimes = bookedProvidertime.map((b: any) => b.time);
 
    const slots: string[] = [];
  
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);
  
    // Convert everything to total minutes to simplify calculations
    let currentTotal = startHour * 60 + startMin;
    const endTotal = endHour * 60 + endMin;
  
    while (currentTotal < endTotal) {
        const hours = Math.floor(currentTotal / 60);
        const minutes = currentTotal % 60;
      
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      
        // skip busy slots
        if (!busyTimes.includes(formattedTime)) {
          slots.push(formattedTime);
        }
      
        currentTotal += interval;
      }
  
    return slots;
  };
  export const generateTimeSlotsbydate = async(start: string, end: string, interval: number,providerId:string,date:Date|string,groupId: string): Promise<{ booked: string[]; slots: string[] }> => {
    const bookedProvidertime = await getProviderbookingsByDate(providerId, date, groupId);

    const busyTimes = bookedProvidertime.map((b: any) => b.time);
 
    const slots: string[] = [];
  
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);
  
    // Convert everything to total minutes to simplify calculations
    let currentTotal = startHour * 60 + startMin;
    const endTotal = endHour * 60 + endMin;
  
    while (currentTotal < endTotal) {
        const hours = Math.floor(currentTotal / 60);
        const minutes = currentTotal % 60;
      
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        slots.push(formattedTime)
        // skip busy slots
        // if (!busyTimes.includes(formattedTime)) {
        //   slots.push(formattedTime);
        // }
      
        currentTotal += interval;
        
      }
  
    return {booked:busyTimes,slots:slots};
  };
  const getProviderbookings=async(providerId:string,date:Date|string, groupId: string)=>{
      const res=await fetch(`/api/getproviderbooking?providerId=${providerId}&date=${date}&groupId=${groupId}`)
      const data=await res.json()
  
      return data
  }
  const getProviderbookingsByDate=async(providerId:string,date:Date|string, groupId: string)=>{
    const res=await fetch(`/api/getproviderbookingbydate?providerId=${providerId}&date=${date}&groupId=${groupId}`)
    const data=await res.json()

    return data
}
  