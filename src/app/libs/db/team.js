const findmemberdata = (id) => {
  const member= teamMembers.find((e) => e.id == id);
  return member?.bookedDates ?? []
};
export {findmemberdata}
const teamMembers = [
    { id: '1', name: 'Alice', bookedDates: [{date:'2026-02-14',
    times:['12:00','15:00']
  },
    {date:'2026-02-16',
    times:['14:00','09:00']
  }] 
  },
    { id: '2', name: 'Bob', bookedDates: [{date:'2026-02-13',times:['08:00']}] },
    { id: '3', name: 'Charlie', bookedDates: [] }
  ]
export default teamMembers
