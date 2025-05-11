import Spinner from "@/ui/Spinner.jsx";
import CabinRow from "@/features/cabins/CabinRow.jsx";
import {useCabins} from "@/features/cabins/useCabins.js";
import Table from "@/ui/Table.jsx";
import Menus from "@/ui/Menus.jsx";
import {useSearchParams} from "react-router-dom";
import Empty from "@/ui/Empty.jsx";

function CabinTable() {
  const {isLoading, cabins} = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner/>
  if (!cabins.length) return <Empty resource={"cabins"} />

  const filterValue = searchParams.get("discount") || "all";
  const sortBy = searchParams.get("sortBy") || "startDate-asc"

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount") filteredCabins = cabins.filter(
    cabin => cabin.discount === 0
  )
  if (filterValue === "with-discount") filteredCabins = cabins.filter(
    cabin => cabin.discount > 0
  )

  const [field, direction] = sortBy.split("-")
  const modifier = direction === "asc" ? 1 : -1
  const sortedCabins = filteredCabins.sort((a,b) => (a[field] - b[field]) * modifier)

  return (
    <Menus>
      <Table columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={item => <CabinRow cabin={item} key={item.id}/>}
        />
      </Table>
    </Menus>
  )
}

export default CabinTable;