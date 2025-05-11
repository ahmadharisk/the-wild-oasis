import styled from "styled-components";
import PropTypes from "prop-types";
import {formatCurrency} from "@/utils/helpers.js";
import CreateCabinForm from "@/features/cabins/CreateCabinForm.jsx";
import {useDeleteCabin} from "@/features/cabins/useDeleteCabin.js";
import {HiPencil, HiSquare2Stack, HiTrash} from "react-icons/hi2";
import {useCreateCabin} from "@/features/cabins/useCreateCabin.js";
import Modal from "@/ui/Modal.jsx";
import ConfirmDelete from "@/ui/ConfirmDelete.jsx";

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

function CabinRow({cabin}) {
  const {isDeleting, deleteCabin} = useDeleteCabin();
  const {id: cabinId, name, max, regularPrice, discount, image, description} = cabin;
  const {isCreating, createCabin} = useCreateCabin()

  function handleDuplcate() {
    createCabin({
      name: `Copy of ${name}`,
      max,
      regularPrice,
      discount,
      image,
      description
    })
  }

  return (
    <TableRow role={"row"}>
      <Img src={image}/>
      <Cabin>{name}</Cabin>
      <div>Fits up to {max} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ?
        <Discount>{formatCurrency(discount)}</Discount> :
        <span>&mdash;</span>
      }
      <div>
        <button
          disabled={isCreating || isDeleting}
          onClick={handleDuplcate}>
          <HiSquare2Stack/>
        </button>

        <Modal>
          <Modal.Open opens={"edit"}>
            <button>
              <HiPencil/>
            </button>
          </Modal.Open>
          <Modal.Window name={"edit"}>
            <CreateCabinForm cabinToEdit={cabin}/>
          </Modal.Window>

          <Modal.Open opens={"delete"}>
            <button>
              <HiTrash/>
            </button>
          </Modal.Open>
          <Modal.Window name={"delete"}>
            <ConfirmDelete
            resourceName={"cabins"}
            disabled={isDeleting}
            onConfirm={() => deleteCabin(cabinId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </TableRow>
  )
}

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    max: PropTypes.number,
    regularPrice: PropTypes.number,
    discount: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string
  })
}

export default CabinRow
