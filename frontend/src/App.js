import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/Spots";
import SingleSpotIndex from "./components/Spots/SingleSpotIndex";
import CreateSpot from "./components/CreateSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SpotsIndex />
          </Route>
          <Route path='/spots/new'>
            <CreateSpot />
          </Route>
          <Route path='/spots/:spotId'>
            <SingleSpotIndex />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;