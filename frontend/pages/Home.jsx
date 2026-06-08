import { useEffect, useState } from "react";
import API from "../api/axios";
import React from 'react';

function Home() {

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs = async () => {

    try {

      const res = await API.get("/jobs");

      setJobs(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const applyJob = async (jobId) => {

    try {

      const token = localStorage.getItem("token");

      await API.post(
        `/applications/${jobId}`,
        {},
        {
          headers:{
            authorization:token
          }
        }
      );

      alert("Applied Successfully");

    } catch (err) {

      console.log(err);

      alert("Already Applied or Login Required");

    }

  };

  // FILTER LOGIC

  const filteredJobs = jobs.filter((job) => {

    return (

      job.title.toLowerCase().includes(search.toLowerCase())

      &&

      job.location.toLowerCase().includes(locationFilter.toLowerCase())

    );

  });

  return (

    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}

      <nav className="bg-black text-white p-5 flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Job Portal
        </h1>

        <div className="flex gap-4">

          <a href="/login" className="hover:text-blue-400">
            Login
          </a>

          <a href="/register" className="hover:text-blue-400">
            Register
          </a>

        </div>

      </nav>

      {/* SEARCH + FILTER */}

      <div className="p-10 flex flex-col md:flex-row gap-5 justify-center">

        <input
          type="text"
          placeholder="Search Jobs..."
          className="p-3 rounded border w-full md:w-96"
          onChange={(e)=>setSearch(e.target.value)}
        />

        <select
          className="p-3 rounded border w-full md:w-60"
          onChange={(e)=>setLocationFilter(e.target.value)}
        >

          <option value="">
            All Locations
          </option>

          <option value="Bangalore">
            Bangalore
          </option>

          <option value="Kochi">
            Kochi
          </option>

          <option value="Chennai">
            Chennai
          </option>

        </select>

      </div>

      {/* JOB LIST */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 pb-10">

        {
          filteredJobs.map((job) => (

            <div
              key={job._id}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300"
            >

              <h2 className="text-2xl font-bold mb-2">
                {job.title}
              </h2>

              <p className="mb-1">
                <span className="font-semibold">
                  Company:
                </span>
                {" "}
                {job.company}
              </p>

              <p className="mb-1">
                <span className="font-semibold">
                  Location:
                </span>
                {" "}
                {job.location}
              </p>

              <p className="mb-1">
                <span className="font-semibold">
                  Salary:
                </span>
                {" "}
                ₹ {job.salary}
              </p>

              <p className="mt-3 text-gray-700">
                {job.description}
              </p>

              <button
                onClick={() => applyJob(job._id)}
                className="mt-5 bg-black text-white px-5 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Apply Now
              </button>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default Home;