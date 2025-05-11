import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import {useMoveBack} from "@/hooks/useMoveBack.js";
import {useBooking} from "@/features/bookings/useBooking.js";
import Spinner from "@/ui/Spinner.jsx";
import {HiArrowDownOnSquare, HiArrowUpOnSquare} from "react-icons/hi2";
import {useNavigate} from "react-router-dom";
import {useCheckout} from "@/features/check-in-out/useCheckout.js";
import ConfirmDelete from "@/ui/ConfirmDelete.jsx";
import Modal from "@/ui/Modal.jsx";
import {useDeleteBooking} from "@/features/bookings/useDeleteBooking.js";
import {useQueryClient} from "@tanstack/react-query";
import PageNotFound from "@/pages/PageNotFound.jsx";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
  const {isLoading, booking, error} = useBooking();
  const {isCheckingOut, checkOut} = useCheckout();
  const {status, id: bookingId} = booking;
  const moveBack = useMoveBack();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const navigate = useNavigate();
  const {isDeleting, deleteBooking} = useDeleteBooking();
  const queryClient = useQueryClient();

  if (error) return <PageNotFound />
  if (isLoading) return <Spinner/>

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking}/>

      <ButtonGroup>
        {status === "unconfirmed" && <Button
          onClick={() => navigate(`/checkin/${bookingId}`)}
          icon={<HiArrowDownOnSquare/>}>
          Check In
        </Button>}
        {status === "checked-in" && <Button
          onClick={() => checkOut(bookingId)}
          disabled={isCheckingOut}
          icon={<HiArrowUpOnSquare/>}>
          Check Out
        </Button>}

        <Modal>
          <Modal.Open opens={"delete"}>
            <Button variation={"danger"}>Delete</Button>
          </Modal.Open>
          <Modal.Window name={"delete"}>
            <ConfirmDelete
              resourceName={"bookings"}
              disabled={isDeleting}
              onConfirm={() => {
                deleteBooking(bookingId, {
                  onSettled: () => {
                    navigate(-1, {
                      replace: true
                    })
                    queryClient.clear()
                  }
                })
              }}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
