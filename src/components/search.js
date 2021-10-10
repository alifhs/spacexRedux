import React, { useState } from "react";
import {changeFilter} from '../store/reducers/LaunchDataReducer';
import { useDispatch } from "react-redux";

export const Search = ({setName}) => {

    const [text, setText] = useState('');

    const dispatch  = useDispatch();

    const onSubmit = (e)=>{
        e.preventDefault();
        // dispatch(changeFilter(text))
       
        dispatch(changeFilter({
          filterName : text === '' ? '' : 'Rocket Name',
          payload : `?rocket_name=${text}`
        }))
        setText('');
    }

  return (
    <div className="max-w-sm rounded overflow-hidden  mx-auto">
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <div className="flex items-center border-2  rounded-md  border-teal-500  ">
          <input
            onChange={(e) => setText(e.target.value)}
            className=" border-2  bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none shadow-inner"
            type="text"
            placeholder="Search Rocket By Name..."
            value={text}
          />
          <button
            className="flex-shrink-0 bg-blue-400 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};
