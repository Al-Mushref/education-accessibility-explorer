import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { FiltersBar } from "../components/FiltersBar";
import { ResultsTable } from "../components/ResultsTable";
import { useState, useEffect } from "react";

interface DistrictData {
  districtId: string;
  name: string;
  website: string | null;
}

export default function Home() {
  const [allDistricts, setAllDistricts] = useState<DistrictData[]>([]);
  const [filteredDistricts, setFilteredDistricts] = useState<DistrictData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/districts")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setAllDistricts(data.rows);
          setFilteredDistricts(data.rows);
        }
      })
      .catch((err) => {
        console.error("Error fetching districts:", err);
      });
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = allDistricts.filter(district =>
        district.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDistricts(filtered);
    } else {
      setFilteredDistricts(allDistricts);
    }
  }, [searchQuery, allDistricts]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <SearchBar onSearch={handleSearch} />
      <FiltersBar />
      <ResultsTable districts={filteredDistricts} />
    </div>
  );
}
