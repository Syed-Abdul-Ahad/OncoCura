import React from "react";
import { Link } from "react-router-dom";

const SingleRecord = ({ records }) => {
  console.log("records : ", records);

  return (
    <div className="flex flex-row gap-10 p-4">
      {records &&
        records.map((record) => (
          <div
            key={record?._id}
            className="record-item bg-red-200 shadow-md w-60 h-32 rounded-lg p-4 mb-4"
          >
            <div>
              <h2 className="text-xl font-bold mb-10">{record?.recordName}</h2>
              <img src="" alt="" />
            </div>
            <Link to={`/records/${record?._id}`}>
              <button className="bg-blue-500 text-white p-1 rounded-md">
                View
              </button>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default SingleRecord;
