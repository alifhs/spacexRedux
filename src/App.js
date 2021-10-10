import { useState, useEffect } from "react";
import { Card } from "./components/card";
import { Search } from "./components/search";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "./store/reducers/LaunchDataReducer";
import moment from "moment";

function App() {
  // const [data, setData] = useState([]);
  // const [isLoading, setIsloading] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const launchData = useSelector((state) => state.launchData.data);
  const filterName = useSelector((state) => state.launchData.filterName);
  const isLoading = useSelector(state => state.launchData.isLoading);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [upcoming, setUpcoming] = useState(false);
  // const [lastWeek, setLastWeek] = useState(false)
  // const [lastMonth, setLastMonth] = useState(false)
  // const [lastYear, setLastYear] = useState(false)
  const [optionState, setOptionState] = useState("empty");

  console.log(filterName);

  const onChange = (e) => {
    let start;
    let end;
    switch (e.target.value) {
      case "last-week":
        setFailure(false);
        setSuccess(false);
        setUpcoming(false);
        start = moment()
          .subtract(1, "weeks")
          .startOf("week")
          .format("YYYY-MM-DD");
        end = moment().subtract(1, "weeks").endOf("week").format("YYYY-MM-DD");
        dispatch(
          changeFilter({
            filterName: "last week",
            payload: `?start=${start}&end=${end}`,
          })
        );
        setOptionState(e.target.value);
        // logout({ returnTo: window.location.origin });
        break;
      case "last-month":
        setFailure(false);
        setSuccess(false);
        setUpcoming(false);
        start = moment()
          .subtract(1, "months")
          .startOf("month")
          .format("YYYY-MM-DD");
        end = moment()
          .subtract(1, "months")
          .endOf("month")
          .format("YYYY-MM-DD");
        dispatch(
          changeFilter({
            filterName: "last month",
            payload: `?start=${start}&end=${end}`,
          })
        );
        setOptionState(e.target.value);
        break;
      case "last-year":
        setFailure(false);
        setSuccess(false);
        setUpcoming(false);
        start = moment()
          .subtract(1, "years")
          .startOf("year")
          .format("YYYY-MM-DD");
        end = moment().subtract(1, "years").endOf("year").format("YYYY-MM-DD");
        dispatch(
          changeFilter({
            filterName: "last year",
            payload: `?start=${start}&end=${end}`,
          })
        );
        setOptionState(e.target.value);
        break;
      default:
        setOptionState("empty");

      // setOption(e.target.value);
    }
  };

  //upcoming

  const onUpcomingChange = (e) => {
    setFailure(false);
    setSuccess(false);
    setOptionState("empty");
    if (!upcoming) {
      dispatch(
        changeFilter({
          filterName: "upcoming launch",
          payload: `/upcoming`,
        })
      );
      setUpcoming(!upcoming);
    } else {
      dispatch(
        changeFilter({
          filterName: "",
          payload: ``,
        })
      );
      setUpcoming(false);
    }
  };

  //success failure
  const onSuccessChange = (e) => {
    setUpcoming(false);
    setOptionState("empty");
    if (failure) {
      setFailure(!failure);
      setSuccess(!success);

      dispatch(
        changeFilter({
          filterName: "successful launch",
          payload: `?launch_success=${!success}`,
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
          payload: `?launch_success=${!success}`,
        })
      );
    }
  };
  const onFailureChange = (e) => {
    setUpcoming(false);
    setOptionState("empty");
    if (success) {
      setSuccess(!success);
      setFailure(!failure);
      dispatch(
        changeFilter({
          filterName: "failed launch",
          payload: `?launch_success=false`,
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
          payload: `?launch_success=false`,
        })
      );
    }
  };

  // useEffect(() => {
  //   // dispatch(changeFilter(''))
  //   dispatch(
  //     changeFilter({
  //       filterName: "",
  //       payload: "",
  //     })
  //   );
  // }, []);

  const filters = { setFailure, setSuccess, setUpcoming };
  return (
    <div className="mx-auto pt-10 bg-gray-100  ">
      <Search  filters = {filters} />

      <div className="flex items-center justify-center mt-10 space-x-12 ">
        {" "}
        {
          <h4 className=" text-blue-400 ">
            {" "}
            <strong>#</strong>
            {filterName === ""
              ? "no filters applied"
              : `filtered by ${filterName}`}{" "}
          </h4>
        }{" "}
        <div className="flex   items-center">
          {" "}
          <input
            checked={success}
            onChange={onSuccessChange}
            type="checkbox"
            id="success"
            name="success"
            value="success"
            className="relative "
          />
          <label className="relative  left-1" for="checkbox">
            successful
          </label>
        </div>
        <div className="flex   items-center">
          {" "}
          <input
            checked={failure}
            type="checkbox"
            onChange={onFailureChange}
            id="failure"
            name="failure"
            value="failure"
            className="relative "
          />
          <label className="relative  left-1" for="checkbox">
            failed
          </label>
        </div>
        <div className="flex relative  items-center">
          {" "}
          <input
            checked={upcoming}
            onChange={onUpcomingChange}
            type="checkbox"
            id="upcoming"
            name="upcoming"
            value="upcoming"
            className="relative "
          />
          <label className="relative left-1" for="checkbox">
            upcoming
          </label>
        </div>
        <div className="">
          <label for="cars">Filter By Date: </label>
          <select
            name="launch_status"
            onChange={onChange}
            value={optionState}
            className="bg-white  outline-none shadow-inner"
          >
            <option value="empty">Select</option>
            <option value="last-week">Last Week</option>

            <option value="last-month">Last Month</option>
            <option value="last-year">Last Year</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading....</h1>
      ) : (
        launchData.length > 0 ? (
          <div className="flex justify-center pt-16">
          <div className=" grid grid-cols-3 gap-4 ">
            {launchData.map((flight, index) => {
              return <Card key={index} flight={flight} />;
            })}
          </div>
        </div>
        ) : (
          <h1 className="text-6xl text-center mx-auto mt-32">No Data Available....Try Other Filters</h1>
        )
       
      )}
    </div>
  );
}

export default App;
