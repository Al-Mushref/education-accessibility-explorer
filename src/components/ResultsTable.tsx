import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface DistrictData {
  districtId: string;
  name: string;
  website: string | null;
}

interface ResultsTableProps {
  districts?: DistrictData[];
}

const ITEMS_PER_PAGE = 20;

export function ResultsTable({ districts = [] }: ResultsTableProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(districts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDistricts = districts.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [districts.length]);

  const handleRowClick = (district: DistrictData) => {
    navigate(`/district/${district.districtId}`);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="px-6 py-4 flex-1 flex flex-col">
      <div className="rounded-lg border bg-white flex-1 flex flex-col">
        <>
          <div className="flex-1 overflow-auto">
            <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>District Name</TableHead>
                    <TableHead>Funding per Student</TableHead>
                    <TableHead>Broadband Access</TableHead>
                    <TableHead>Demographics</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentDistricts.map((district) => (
                    <TableRow
                      key={district.districtId}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleRowClick(district)}
                    >
                      <TableCell>{district.name}</TableCell>
                      <TableCell>{"N/A"}</TableCell>
                      <TableCell>{"N/A"}</TableCell>
                      <TableCell>{"N/A"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {totalPages > 1 && (
              <div className="border-t px-4 py-3 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, districts.length)} of {districts.length} districts
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <div className="text-sm">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
      </div>
    </div>
  );

}
