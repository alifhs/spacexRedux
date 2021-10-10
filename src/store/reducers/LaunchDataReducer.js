const initialState = {
  filterName: "",
  data: [],
};

export function launchDataReducer(state = initialState, action) {
  if (action.type === "filterChanged")
    return { ...state, filterName: action.payload };
  else if (action.type === "launchDataChanged")
    return { ...state, data: action.payload };
  return state;
}




//action creators


export function changeFilter({filterName, payload})  {

  return function changeFilterThunk(dispatch) {
    dispatch( {
      type: 'filterChanged',
      payload: filterName
    });
    fetch(
      
      `https://api.spacexdata.com/v3/launches?${payload}`
    )
      .then((res) => res.json())
      .then((data) => {
        let selectedData = data.map((item, index) => {
          return {
            flight_number: item.flight_number,
            mission_name: item.mission_name,
            rocket_name: item.rocket.rocket_name,
            launch_date: (new Date(item.launch_date_utc)).toLocaleDateString(),
            image: item.links.mission_patch_small,
            payload: item.rocket.second_stage.payloads[0].payload_type,
            launch_success : item.launch_success,
            details: item.links.article_link
          };
        });
        dispatch({
          type: 'launchDataChanged',
          payload : selectedData
        });
        // setIsloading(false);
      })
      .catch((err) => console.log(err));
  }
}


