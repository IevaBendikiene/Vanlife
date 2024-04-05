import React, { useEffect, useState } from "react";
import { useParams, Link, Outlet, NavLink } from "react-router-dom";

export default function HostVanDetail() {
  const [currentVan, setCurrentVan] = useState();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  useEffect(() => {
    const fetchVanDetails = async () => {
      try {
        const response = await fetch(`/api/host/vans/${id}`);

        if (response.status === 500) {
          setError("Server error");
          return;
        }
        const json = await response.json();
        if (!response.ok) {
          setError(json.error);
          return;
        }
        setCurrentVan(json);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError(err);
      }
    };
    fetchVanDetails();
  }, [id]);

  if (loading) {
    return <h1 aria-label="polite">Loading...</h1>;
  }
  if (error) {
    return <h1 aria-label="assertive">There was an error: {error}</h1>;
  }
  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>
      {currentVan && (
        <div className="host-van-detail-layout-container">
          <div className="host-van-detail">
            <img src={currentVan.imageUrl} />
            <div className="host-van-detail-info-text">
              <i className={`van-type van-type-${currentVan.type}`}>
                {currentVan.type}
              </i>
              <h3>{currentVan.name}</h3>
              <h4>${currentVan.price}/day</h4>
            </div>
          </div>
          <nav className="host-van-detail-nav">
            <NavLink
              to="."
              end
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Details
            </NavLink>
            <NavLink
              to="pricing"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Pricing
            </NavLink>
            <NavLink
              to="photos"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Photos
            </NavLink>
          </nav>
          <Outlet context={{ currentVan }} />
        </div>
      )}
    </section>
  );
}
