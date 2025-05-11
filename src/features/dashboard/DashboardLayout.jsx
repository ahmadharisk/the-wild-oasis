import styled from "styled-components";
import {useRecentBookings} from "@/features/dashboard/useRecentBookings.js";
import Spinner from "@/ui/Spinner.jsx";
import {useRecentStays} from "@/features/dashboard/useRecentStays.js";
import Stats from "@/features/dashboard/Stats.jsx";
import {useCabins} from "@/features/cabins/useCabins.js";
import SalesChart from "@/features/dashboard/SalesChart.jsx";
import DurationChart from "@/features/dashboard/DurationChart.jsx";
import TodayActivity from "@/features/check-in-out/TodayActivity.jsx";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

function DashboardLayout() {
  const {bookings, isLoading: isLoading1} = useRecentBookings();
  const {confirmedStays, isLoading: isLoading2, numDays} = useRecentStays();
  const {cabins, isLoading: isLoading3} = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner/>

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart numDays={numDays} bookings={bookings}/>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout;