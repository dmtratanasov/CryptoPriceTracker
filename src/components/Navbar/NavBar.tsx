import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./NavbarStyles.css";

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <>
      <Typography variant="h4" component="div" className="title">
        Crypto Lookup
      </Typography>
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
