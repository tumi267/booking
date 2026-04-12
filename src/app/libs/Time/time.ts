export const generateTimeSlots = (start: string, end: string, interval: number): string[] => {
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
      slots.push(formattedTime);
  
      currentTotal += interval;
    }
  
    return slots;
  };