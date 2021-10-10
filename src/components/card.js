import React from "react";

export const Card = ({ flight }) => {
  // const tags = image.tags.split(",");
  return (
    <div className="max-w-sm  rounded overflow-hidden shadow-lg">
      <img src={flight.image} alt="missing rocket " className="w-full h-40 object-scale-down " />
      {/* {flight_number: item.flight_number , mission_name: item.mission_name, rocket_name : item.rocket.rocket_name, launch_year: item.launch_year} */}
      <div className="px-6 py-6">
        <div className="font-bold text-blue-500 text-xl mb-2">
          Flight number {flight.flight_number}
        </div>
        <ul>
          <li>
            <strong>Mission Name: </strong>
            {flight.mission_name}
          </li>
          <li>
            <strong>rocket name: </strong>
            {flight.rocket_name}
          </li>
          <li>
            <strong>Launch Date: </strong>
            {flight.launch_date}
          </li>
          <li>
            <strong>Payload: </strong>
            {flight.payload}
          </li>
          <li>
            <strong>Launch Status: </strong>
            {flight.launch_success ? "Success" : "Failure"}
          </li>
          <li>
            <strong>Details: </strong>
            <a className="text-blue-400" href={flight.details}>Click here for more details</a>
            
          </li>
        </ul>
      </div>
      <div className="px-6 py-6">
        {/* {tags.map((tag, index) => {
          return (
            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              #{tag}
            </span>
          );
        })} */}
      </div>
    </div>
  );
};