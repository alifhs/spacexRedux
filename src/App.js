import { useState, useEffect } from "react";
import { Card } from "./components/card";
import { Search } from "./components/search";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "./store/reducers/LaunchDataReducer";

function App() {
  // const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const launchData = useSelector((state) => state.launchData.data);
  const filterName = useSelector((state) => state.launchData.filterName);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  console.log(filterName);

  const onChange = (e) => {
    switch (e.target.value) {
      case "success":
        // logout({ returnTo: window.location.origin });
        break;
      case "failure":
        break;
      default:

      // setOption(e.target.value);
    }
  };

  //success failure
  const onSuccessChange = (e) => {
    if (failure) {
      setFailure(!failure);
      setSuccess(!success);
      dispatch(
        changeFilter({
          filterName: "successful launch",
          payload: `launch_success=${!success}`,
        })
      );
    } else if (success) {
      setSuccess(!success);
      dispatch(
        changeFilter({
          filterName: "",
          payload: ``,
        })
      );
    } else {
      //when success is false
      setSuccess(!success);
      dispatch(
        changeFilter({
          filterName: "successful launch",
          payload: `launch_success=${!success}`,
        })
      );
    }
  };
  const onFailureChange = (e) => {
    if (success) {
      setSuccess(!success);
      setFailure(!failure);
      dispatch(
        changeFilter({
          filterName: "failed launch",
          payload: `launch_success=false`,
        })
      );
    } else if (failure) {
      setFailure(!failure);
      dispatch(
        changeFilter({
          filterName: "",
          payload: ``,
        })
      );
    } else {
      setFailure(!failure);
      dispatch(
        changeFilter({
          filterName: "failed launch",
          payload: `launch_success=false`,
        })
      );
    }
  };

  useEffect(() => {
    // dispatch(changeFilter(''))
    dispatch(
      changeFilter({
        filterName: "",
        payload: "",
      })
    );
  }, []);
  return (
    <div className="mx-auto pt-10 border-green-100  ">
      <Search setName={setName} />

      <div className="flex ml-14 mt-10 space-x-12 ">
        {" "}
        {
          <h4 className=" text-blue-400 ">
            {" "}
            {filterName === ""
              ? "no filters applied"
              : `filtered by ${filterName}`}{" "}
          </h4>
        }{" "}
        <div className="flex items-center">
          {" "}
          <input
            checked={success}
            onChange={onSuccessChange}
            type="checkbox"
            id="success"
            name="success"
            value="success"
          />
          <label className="relative bottom-1 left-1" for="checkbox">
            success
          </label>
        </div>
        <div className="flex items-center">
          {" "}
          <input
            checked={failure}
            type="checkbox"
            onChange={onFailureChange}
            id="failure"
            name="failure"
            value="failure"
          />
          <label className="relative bottom-1 left-1" for="checkbox">
            failure
          </label>
        </div>
      </div>
      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading....</h1>
      ) : (
        <div className="flex justify-center pt-16">
          <div className=" grid grid-cols-3 gap-4 ">
            {launchData.map((flight, index) => {
              return <Card key={index} flight={flight} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
