import TableOperations from "@/ui/TableOperations.jsx";
import Filter from "@/ui/Filter.jsx";
import SortBy from "@/ui/SortBy.jsx";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter filterField={"discount"} options={[
        {value: "all", label: "All"},
        {value: "no-discount", label: "No discount"},
        {value: "with-discount", label: "With discount"}
      ]}/>

      <SortBy options={[
        {value: "name-asc", label: "Sort By Name (A-Z)"},
        {value: "name-desc", label: "Sort By Name (Z-A)"},
        {value: "regularPrice-asc", label: "Sort By Price (lowest)"},
        {value: "regularPrice-desc", label: "Sort By Price (highest)"},
        {value: "max-asc", label: "Sort By Max Capacity (lowest)"},
        {value: "max-desc", label: "Sort By Max Capacity (highest)"}
      ]} />
    </TableOperations>
  )
}

export default CabinTableOperations;