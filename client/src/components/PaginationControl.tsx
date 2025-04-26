// ✅ src/components/PaginationControl.tsx
import { Pagination, Box } from "@mui/material";
import useJobSearchStore from "@/store/useJobSearchStore.ts";

export default function PaginationControl({ total }: { total: number }) {
  const { page, limit, setPage } = useJobSearchStore();

  const pageCount = Math.ceil(total / limit);
  if (pageCount <= 1) return null;

  return (
    <Box display="flex" justifyContent="center" mt={3}>
      <Pagination
        count={pageCount}
        page={page}
        onChange={(e, val) => setPage(val)}
      />
    </Box>
  );
}
