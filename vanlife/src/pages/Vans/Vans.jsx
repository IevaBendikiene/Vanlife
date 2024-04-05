import React from "react";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const typeFilter = searchParams.get("type");

  useEffect(() => {
    const fetchVans = async () => {
      try {
        const response = await fetch("/api/vans/");

        if (response.status === 500) {
          setError("Server error");
          return;
        }
        const json = await response.json();
        setVans(json);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError(err);
      }
    };
    fetchVans();
  }, []);

  const displayedVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  const vanElements = displayedVans.map((van) => (
    <div key={van._id} className="van-tile">
      <Link
        to={van._id}
        state={{
          search: `?${searchParams.toString()}`,
          type: typeFilter,
        }}
        aria-label={`View details for ${van.name}, 
            priced at $${van.price} per day`}
      >
        <img src={van.imageUrl} alt={`Image of ${van.name}`} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));
  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }
  if (loading) {
    return <h1 aria-label="polite">Loading...</h1>;
  }
  if (error) {
    return <h1 aria-label="assertive">There was an error: {error}</h1>;
  }
  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          onClick={() => handleFilterChange("type", "simple")}
          className={`van-type simple ${
            typeFilter === "simple" ? "selected" : ""
          }`}
        >
          Simple
        </button>
        <button
          onClick={() => handleFilterChange("type", "luxury")}
          className={`van-type luxury ${
            typeFilter === "luxury" ? "selected" : ""
          }`}
        >
          Luxury
        </button>
        <button
          onClick={() => handleFilterChange("type", "rugged")}
          className={`van-type rugged ${
            typeFilter === "rugged" ? "selected" : ""
          }`}
        >
          Rugged
        </button>
        {typeFilter ? (
          <button
            onClick={() => handleFilterChange("type", null)}
            className="van-type clear-filters"
          >
            Clear filter
          </button>
        ) : null}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
