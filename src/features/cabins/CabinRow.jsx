import styled from "styled-components";
import PropTypes from "prop-types";
import {formatCurrency} from "@/utils/helpers.js";
import CreateCabinForm from "@/features/cabins/CreateCabinForm.jsx";
import {useDeleteCabin} from "@/features/cabins/useDeleteCabin.js";
import {HiPencil, HiSquare2Stack, HiTrash} from "react-icons/hi2";
import {useCreateCabin} from "@/features/cabins/useCreateCabin.js";
import Modal from "@/ui/Modal.jsx";
import ConfirmDelete from "@/ui/ConfirmDelete.jsx";
import Table from "@/ui/Table.jsx";
import Menus from "@/ui/Menus.jsx";


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
  const {id: cabinId, name, maxCapacity, regularPrice, discount, image, description} = cabin;
  const {isCreating, createCabin} = useCreateCabin()

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description
    })
  }

  return (
    <Table.Row>
      <Img src={image}/>
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ?
        <Discount>{formatCurrency(discount)}</Discount> :
        <span>&mdash;</span>
      }
      <div>

        <Modal>
          <Menus.Menu>

            <Menus.Toggle id={cabinId}/>

            <Menus.List id={cabinId}>
              <Menus.Button
                icon={<HiSquare2Stack/>}
                onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens={"edit"}>
                <Menus.Button icon={<HiPencil/>}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens={"delete"}>
                <Menus.Button icon={<HiTrash/>}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name={"edit"}>
            <CreateCabinForm cabinToEdit={cabin}/>
          </Modal.Window>

          <Modal.Window name={"delete"}>
            <ConfirmDelete
              resourceName={"cabins"}
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinId)}
            />
          </Modal.Window>

        </Modal>
      </div>
    </Table.Row>
  )
}

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxCapacity: PropTypes.number,
    regularPrice: PropTypes.number,
    discount: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string
  })
}

export default CabinRow
