import React from "react";
import { Typography, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./NavbarStyles.css";
import { Link } from "react-router-dom";

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <>
      <div className="search">
        <div className="search-icon">
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search for cryptocurrencies..."
          onChange={handleSearch}
          classes={{
            root: "input-root",
            input: "input-input",
          }}
        />
      </div>
    </>
  );
};

export default Navbar;
