import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

export function ResultsTable() {
  const navigate = useNavigate();
  const [districts, setDistricts] = useState<DistrictData[]>([]);

useEffect(() => {
  fetch("http://localhost:4000/api/districts")
    .then((res) => res.json())
    .then((data) => {
      if (data.ok) {
        setDistricts(data.rows);
      }
    })
    .catch((err) => {
      console.error("Error fetching districts:", err);
    });
}, []);


  const handleRowClick = (district: DistrictData) => {
    navigate(`/district/${district.districtId}`);
    // Here you would typically navigate to a detailed view
  };

  return (
    <div className="px-6 py-4 flex-1">
      <div className="rounded-lg border bg-white">
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
            {districts.map((district) => (
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
    </div>
  );

}
