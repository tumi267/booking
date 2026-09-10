import BookingCards from "@/app/components/user/BookingCard/BookingCard";
import Nav from "@/app/components/user/Nav/Nav";
import { GetUserUpcomingBooking } from "@/app/libs/crud/user/getuserbooking";

export default async function Page({params,}: { params: { id: string };}) {
  const { id } = params;
  const bookingData = await GetUserUpcomingBooking(id);

  return (
    <div>
      <Nav id={id} />
      {bookingData.length==0&&<h2>no booking found</h2>}
      <BookingCards bookingData={bookingData} />
    </div>
  );
}