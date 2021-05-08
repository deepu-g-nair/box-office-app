import React, { useState } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import CustomRadio from "../components/CustomRadio";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/shows/ShowGrid";
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from "./Home.styled";

const Home = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState("shows");

  const isShowsSearch = searchOption === "shows";
  console.log(isShowsSearch);
  const onSearch = () => {
    fetch(`http://api.tvmaze.com/search/${searchOption}?q=${input}`)
      .then((res) => res.json())
      .then((result) => {
        setResults(result);
        console.log(result);
      });
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSearch();
    }
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No results</div>;
    }
    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }
  };

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        value={input}
        placeholder="search for something"
        onKeyDown={onKeyDown}
        onChange={(e) => setInput(e.target.value)}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-search"
            value="shows"
            checked={isShowsSearch}
            onChange={(e) => setSearchOption(e.target.value)}
          />
        </div>
        <div>
          <CustomRadio
            label="Actors"
            id="actors-search"
            value="people"
            checked={!isShowsSearch}
            onChange={(e) => setSearchOption(e.target.value)}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button onClick={onSearch}>search</button>
      </SearchButtonWrapper>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
