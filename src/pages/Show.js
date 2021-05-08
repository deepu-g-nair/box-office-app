import React, { useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cast from "../components/shows/Cast";
import Details from "../components/shows/Details";
import Seasons from "../components/shows/Seasons";
import ShowMainData from "../components/shows/ShowMainData";
import { InfoBlock, ShowPageWrapper } from "./Show.styled";

const Show = () => {
  const { id } = useParams();

  const reducer = (prevState, action) => {
    switch (action.type) {
      case "FETCH_SUCCESS": {
        return { isLoading: false, error: null, show: action.show };
      }
      case "FETCH_FAILED": {
        return { ...prevState, isLoading: false, error: action.error };
      }
      default:
        return prevState;
    }
  };
  const initialState = {
    show: null,
    isLoading: true,
    error: null,
  };

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    let isMounted = true;

    fetch(`http://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted) {
          dispatch({ type: "FETCH_SUCCESS", show: result });
        }
      })
      .catch((err) => {
        if (isMounted) {
          dispatch({ type: "FETCH_FAILED", error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  console.log("show", show);

  if (isLoading) {
    return <div>Date is being loaded</div>;
  }
  if (error) {
    return <div>Error occured : {error} </div>;
  }

  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />
      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>
      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>
      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
