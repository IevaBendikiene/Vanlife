import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function HostVans() {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user} = useAuthContext()
  
  useEffect(() => {
    const fetchVans = async () => {
      try {
        const response = await fetch("/api/host/vans",{
          header: {'Authorization': `Bearer ${user.token}`}
        });

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
    if(user) {
      fetchVans();
    }
    
  }, [user]);

  const hostVansEls = vans.map((van) => (
    <Link to={van._id} key={van._id} className="host-van-link-wrapper">
      <div className="host-van-single" key={van._id}>
        <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
        <div className="host-van-info">
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
        </div>
      </div>
    </Link>
  ));
  if (loading) {
    return <h1 aria-label="polite">Loading...</h1>;
  }

  if (error) {
    return <h1 aria-label="assertive">There was an error: {error}</h1>;
  }

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        {vans.length > 0 ? (
          <section>{hostVansEls}</section>
        ) : (
          <h2>No posted vans</h2>
        )}
      </div>
    </section>
  );
}
