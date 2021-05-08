import React, { useState, useEffect } from "react";
import MainPageLayout from "../components/MainPageLayout";
import { useShows } from "../components/custom-hooks";
import ShowGrid from "../components/shows/ShowGrid";

const Starred = () => {
  const [starred] = useShows();

  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map((showId) =>
        fetch(`https://api.tvmaze.com/shows/${showId}`).then((resp) =>
          resp.json()
        )
      );
      console.log(promises);
      Promise.all(promises)
        .then((apiData) => apiData.map((show) => ({ show })))

        .then((results) => {
          console.log("aa", results);
          setShows(results);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);
  console.log(shows);

  return (
    <MainPageLayout>
      {isLoading && <div>Shows are still loading</div>}
      {error && <div>Error occured: {error}</div>}
      {!isLoading && !shows && <div>No shows were added</div>}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
};

export default Starred;
