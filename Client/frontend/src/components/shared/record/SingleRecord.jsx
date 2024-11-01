import React from "react";

const SingleRecord = ({ records }) => {
  console.log("records", records);
  return (
    <div className="p-4">
      {records.map((record) => (
        <div
          key={record.id}
          className="record-item bg-white shadow-md rounded-lg p-4 mb-4"
        >
          <h2 className="text-xl font-bold mb-2">{record.title}</h2>
          <p className="text-gray-700">{record.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SingleRecord;
