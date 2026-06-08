import { useEffect, useState } from "react";
import API from "../api/axios";
import React from 'react';
function CandidateDashboard() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {

    fetchApplications();

  }, []);

  const fetchApplications = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get(
        "/applications/my",
        {
          headers:{
            authorization:token
          }
        }
      );

      setApplications(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="p-10">

      <h1 className="text-3xl mb-5">
        My Applications
      </h1>

      <div className="grid gap-5">

        {
          applications.map((item) => (

            <div
              key={item._id}
              className="border p-5 rounded"
            >

              <h2 className="text-2xl">
                {item.job?.title}
              </h2>

              <p>
                {item.job?.company}
              </p>

              <p>
                Status:
                <span className="font-bold ml-2">
                  {item.status}
                </span>
              </p>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default CandidateDashboard;