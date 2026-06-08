import { useEffect, useState } from "react";
import API from "../api/axios";
import React from 'react';
function EmployerDashboard() {

  const [form, setForm] = useState({
    title:"",
    company:"",
    location:"",
    salary:"",
    description:""
  });

  const [jobs, setJobs] = useState([]);

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

  const createJob = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/jobs",
        form,
        {
          headers:{
            authorization:token
          }
        }
      );

      alert("Job Created");

      fetchJobs();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        Employer Dashboard
      </h1>

      {/* CREATE JOB CARD */}

      <div className="flex justify-center mb-12">

        <form
          onSubmit={createJob}
          className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col gap-4"
        >

          <h2 className="text-2xl font-semibold text-center mb-2">
            Create Job
          </h2>

          <input
            type="text"
            placeholder="Job Title"
            className="border p-3 rounded"
            onChange={(e)=>
              setForm({
                ...form,
                title:e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Company"
            className="border p-3 rounded"
            onChange={(e)=>
              setForm({
                ...form,
                company:e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Location"
            className="border p-3 rounded"
            onChange={(e)=>
              setForm({
                ...form,
                location:e.target.value
              })
            }
          />

          <input
            type="number"
            placeholder="Salary"
            className="border p-3 rounded"
            onChange={(e)=>
              setForm({
                ...form,
                salary:e.target.value
              })
            }
          />

          <textarea
            placeholder="Description"
            rows="4"
            className="border p-3 rounded"
            onChange={(e)=>
              setForm({
                ...form,
                description:e.target.value
              })
            }
          />

          <button
            className="bg-black text-white p-3 rounded transition duration-300 hover:bg-blue-600 hover:scale-105"
          >
            Create Job
          </button>

        </form>

      </div>

      {/* JOB LIST */}

      <h2 className="text-3xl font-bold text-center mb-8">
        Posted Jobs
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {
          jobs.map((job)=>(

            <div
              key={job._id}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300"
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

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default EmployerDashboard;