import Button from "@/ui/Button.jsx";
import Modal from "@/ui/Modal.jsx";
import CreateCabinForm from "@/features/cabins/CreateCabinForm.jsx";

function AddCabin() {
  return <div>
    <Modal>
      <Modal.Open opens={"cabin-form"}>
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name={"cabin-form"}>
        <CreateCabinForm/>
      </Modal.Window>
    </Modal>
  </div>
}

// function AddCabin() {
//   const [isOpenModel, setIsOpenModel] = useState(false)
//
//   return <div>
//     <CabinTable/>
//     <Button onClick={() => setIsOpenModel((show) => !show)}>Add new cabin</Button>
//     {isOpenModel && (
//       <Modal onClose={() => setIsOpenModel(false)}>
//         <CreateCabinForm onCloseModal={() => setIsOpenModel(false)}/>
//       </Modal>
//     )}
//   </div>
// }

export default AddCabin;