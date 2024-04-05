import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function VanDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [van, setVan] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchVanDetails = async () => {
      try {
        const response = await fetch(`/api/vans/${id}`);

        if (response.status === 500) {
          setError("Server error");
          return;
        }
        const json = await response.json();
        if (!response.ok) {
          setError(json.error);
          return;
        }
        setVan(json);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError(err);
      }
    };
    fetchVanDetails();
  }, [id]);

  if (loading) {
    return <h1 aria-live="polite">Loading...</h1>;
  }
  if (error) {
    return <h1 aria-label="assertive">There was an error: {error}</h1>;
  }
  const search = location.state?.search || "";
  const type = location.state?.type || "all";

  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>
      {van && (
        <div className="van-detail">
          <img src={van.imageUrl} alt={`Van ${van.name} picture`} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      )}
    </div>
  );
}
