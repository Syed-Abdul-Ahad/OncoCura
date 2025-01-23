import React, { useState, useEffect } from "react";
import { SkeletonLoader } from "../../common/Loader";
import { Link } from "react-router-dom";

const SingleRecord = ({ records }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [records]);

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="flex flex-row flex-wrap gap-10 p-10 w-full ">
      {records &&
        records.map((record) => (
          <div
            key={record?._id}
            className="record-item bg-white shadow-2xl w-60 h-32 rounded-xl p-4 mb-4"
          >
            <div>
              <img
                src="./folder.jpeg"
                alt="folder"
                className="w-12 h-12 mb-2"
              />
            </div>
            <hr />

            <div className="flex flex-row  w-full h-full">
              <h2 className="text-sm mt-3 font-bold mb-3 w-full capitalize">
                {record?.recordName}
              </h2>

              <Link to={`/records/${record?._id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-end mt-2 ml-36"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SingleRecord;
