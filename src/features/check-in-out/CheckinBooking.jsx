import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import {useMoveBack} from "../../hooks/useMoveBack";
import {useBooking} from "@/features/bookings/useBooking.js";
import Spinner from "@/ui/Spinner.jsx";
import {useEffect, useState} from "react";
import Checkbox from "@/ui/Checkbox.jsx";
import {formatCurrency} from "@/utils/helpers.js";
import {useCheckin} from "@/features/check-in-out/useCheckin.js";
import {useSettings} from "@/features/settings/useSettings.js";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false)
  const {isLoading, booking} = useBooking();
  const moveBack = useMoveBack();
  const {isCheckingIn, checkIn} = useCheckin();
  const {isLoading: isLoadingSettings, settings} = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid || false)
  }, [booking]);


  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  if (isLoading || isLoadingSettings) return <Spinner/>

  const optionalBreakfastPrice = settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice
        }
      })
    } else {
      checkIn({bookingId, breakfast: {}})

    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking}/>

      {!hasBreakfast && <Box>
        <Checkbox
          onChange={() => {
            setAddBreakfast(prev => !prev)
            setConfirmPaid(false)
          }}
          id={"breakfast"}
          checked={addBreakfast}>
          Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
        </Checkbox>
      </Box>}

      <Box>
        <Checkbox
          disabled={confirmPaid}
          id={"confirm"}
          onChange={() => setConfirmPaid(confirm => !confirm)}
          checked={confirmPaid || isCheckingIn}>
          I confirm that {guests.fullName} has paid the total amount
          {!addBreakfast ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfastPrice)} 
            (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
