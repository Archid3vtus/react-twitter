import React from "react";

export default function SearchBar() {
  return (
    <div className="flex-row align-center search-bar">
      <i className="bi bi-search" />
      <input placeholder="Search" />
    </div>
  );
}
