import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify'
import { addJobApi, deleteJobApi, getAllApplicationApi, getAllJobsApi } from '../../services/allApi'
import { Link } from 'react-router-dom'
import { serverUrl } from '../../services/serverUrl'


function AdminCareers() {
  const [jobpostStatus, setjobpostStatus] = useState(true)
  const [viewapplicationStatus, setviewapplicationStatus] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const [addjobstatus, setAddJobStatus] = useState({})
  const [searchKey, setSearchKey] = useState("")
  const [jobdetails, setJobDetails] = useState({
    title: "", location: "", jType: "", salary: "", qualification: "", experience: "", description: ""
  })
  console.log(jobdetails);

  const [allJobs, setAllJobs] = useState([])
  const [deletejobstatus, setDeleteJobSatus] = useState("")

  const [allApplication, setAllApplication] = useState([])

  const handleReset = () => {

    setJobDetails({ title: "", location: "", jType: "", salary: "", qualification: "", experience: "", description: "" })

  }

  const handleSubmit = async () => {

    const { title, location, jType, salary, qualification, experience, description } = jobdetails
    if (!title || !location || !jType || !salary || !qualification || !experience || !description) {
      toast.info('Please fill the fields completely')
    }
    else {
      const result = await addJobApi({ title, location, jType, salary, qualification, experience, description })
      console.log(result);
      if (result.status == 200) {
        toast.success('Job added successfully')
        handleReset()
        setModalStatus(false)
        setAddJobStatus(result.data)
      }
      else if (result.status == 401) {
        toast.info(result.response.data)
      }
      else {
        toast.error('Something went wrong')
      }

    }

  }

  const getAllJobs = async (searchKey) => {
    const result = await getAllJobsApi(searchKey)
    // console.log(result);
    if (result.status == 200) {
      setAllJobs(result.data)
    }
    else {
      toast.error('something went wrong')
    }

  }


  //delete job
  const deleteJob = async (id) => {
    const result = await deleteJobApi(id)
    console.log(result);
    if (result.status == 200) {
      toast.success('Deleted successfully')
      setDeleteJobSatus(result.data)

    }


  }

  //get all applications
  const getAllApplication = async () => {
    const result = await getAllApplicationApi()
    if (result.status == 200) {
      setAllApplication(result.data)
    }
  }
  console.log(allApplication);


  useEffect(() => {
    if (jobpostStatus == true) {
      getAllJobs(searchKey)
    }
    else if (viewapplicationStatus == true) {
      getAllApplication()
    } else {
      console.log('something went wrong');

    }

  }, [addjobstatus, searchKey, deletejobstatus, viewapplicationStatus])

  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-[1fr_4fr]'>
        <div className='bg-blue-100 flex flex-col items-center p-5'>
          <AdminSidebar />
        </div>
        <div>
          <h1 className='text-3xl font-bold text-center my-5'>Careers</h1>
          {/* tab */}
          <div className='flex justify-center items-center my-5'>
            <p onClick={() => { setjobpostStatus(true), setviewapplicationStatus(false) }} className={jobpostStatus ? 'p-4 text-black rounded border-t border-r border-gray-200 cursor-pointer' : 'p-4 text-blue-600 rounded border-t border-r border-gray-200 cursor-pointer'}>Job Post</p>
            <p onClick={() => { setjobpostStatus(false), setviewapplicationStatus(true) }} className={viewapplicationStatus ? 'p-4 text-black rounded border-b border-l border-gray-200 cursor-pointer' : 'p-4 text-blue-600 rounded border-b border-l border-gray-200 cursor-pointer'}>View Application</p>
          </div>
          {jobpostStatus &&
            <div>
              <div className='flex justify-between md:px-10 py-5 p-5'>
                <div className='flex justify-center items-center my-5'>
                  <input value={searchKey} onChange={(e) => setSearchKey(e.target.value)} placeholder='Job Title' className='border border-gray-400 px-5 py-2 md:w-96 w-40 placeholder-gray-400' type="text" />
                  <button className='bg-green-800 text-white px-5 py-2 border border-green-800 hover:bg-white hover:text-green-800'>Search</button>
                </div>
                <div>
                  <button onClick={() => setModalStatus(true)} className='border border-blue-900 bg-white text-blue-900 px-5 py-2 hover:bg-blue-900 hover:text-white my-5'>Add Job</button>
                </div>
              </div>
              <div className='md:px-10 py-5 p-5'>
                {
                  allJobs?.length > 0 ?
                    allJobs?.map((items, index) => (
                      <div className='shadow border border-gray-500' key={index}>
                        <div className="md:grid grid-cols-[8fr_1fr] p-5" >
                          <div>
                            <h1 className='mb-3'>{items?.title}</h1>
                            <hr />
                            <p className='mt-3'><FontAwesomeIcon icon={faLocationDot} className='text-blue-600 me-3' />Kochi</p>
                            <p className='mt-3'>Job type:{items?.jType}</p>
                            <p className='mt-3'>salary:{items?.salary}</p>
                            <p className='mt-3'>qualification:{items?.qualification}</p>
                            <p className='mt-3'>experience:{items?.experience}</p>
                            <p className='text-justify'>description:{items?.description}</p>
                          </div>
                          <div className='flex md:justify-center items-start justify-end'>
                            <button onClick={() => deleteJob(items?._id)} className='bg-red-800 text-white px-3 py-2 border border-red-800 hover:bg-white hover:text-red-800  rounded ms-3 md:mt-0 mt-5'> Delete <FontAwesomeIcon icon={faTrashCan} /></button>
                          </div>

                        </div>
                      </div>
                    )) :
                    <p>No jobs</p>
                }

              </div>
            </div>

          }

          {modalStatus && <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div class="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  {/* title of modal */}
                  <div class="bg-gray-900 p-4 flex sm:px-6 justify-between">
                    <h1 className='text-white text-2xl '>Application Form</h1>
                    <FontAwesomeIcon onClick={() => setModalStatus(false)} icon={faXmark} className='text-white fa-2x' />
                  </div>

                  {/* body of modal */}
                  <div class="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                    <div className="mb-3">
                      <input value={jobdetails.title} onChange={(e) => setJobDetails({ ...jobdetails, title: e.target.value })}
                        type="text"
                        placeholder="Title"
                        className="p-2 border w-full border-gray-400 rounded placeholder:text-gray-500"
                      />
                    </div>

                    <div className="mb-3">
                      <input value={jobdetails.location} onChange={(e) => setJobDetails({ ...jobdetails, location: e.target.value })}
                        type="text"
                        placeholder="Location"
                        className="p-2 border w-full border-gray-400 rounded placeholder:text-gray-500"
                      />
                    </div>
                    <div className="mb-3">
                      <input value={jobdetails.jType} onChange={(e) => setJobDetails({ ...jobdetails, jType: e.target.value })}
                        type="text"
                        placeholder="Job Type"
                        className="p-2 w-full border  border-gray-400 rounded placeholder:text-gray-500"
                      />
                    </div>

                    <div className="mb-3">
                      <input value={jobdetails.salary} onChange={(e) => setJobDetails({ ...jobdetails, salary: e.target.value })}
                        type="text"
                        placeholder="Salary"
                        className="p-2 w-full border  border-gray-400 rounded placeholder:text-gray-500"
                      />
                    </div>

                    <div className="mb-3">
                      <input value={jobdetails.qualification} onChange={(e) => setJobDetails({ ...jobdetails, qualification: e.target.value })}
                        type="text"
                        placeholder="Qualification"
                        className="p-2 w-full border  border-gray-400 rounded placeholder:text-gray-500"
                      />
                    </div>

                    <div className="mb-3">
                      <input value={jobdetails.experience} onChange={(e) => setJobDetails({ ...jobdetails, experience: e.target.value })}
                        type="text"
                        placeholder="Experience"
                        className="p-2 border w-full border-gray-400 rounded placeholder:text-gray-500"
                      />
                    </div>

                    <div className="mb-3">
                      <textarea value={jobdetails.description} onChange={(e) => setJobDetails({ ...jobdetails, description: e.target.value })}
                        type="text"
                        placeholder="Experience"
                        className="p-2 border w-full border-gray-400 rounded placeholder:text-gray-500">
                      </textarea>
                    </div>
                  </div>

                  {/* footer of modal */}
                  <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button onClick={handleSubmit} type="button" class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:text-black shadow-xs hover:bg-white sm:ml-3 sm:w-auto hover:border hover:border-black">Submit</button>
                    <button onClick={handleReset} type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:text-black shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto hover:border hover:border-black">Reset</button>
                  </div>
                </div>
              </div>
            </div>
          </div>}

          {viewapplicationStatus &&
            <div>
              <div className='flex justify-between md:px-10 py-5 p-5'>
                <div className='flex justify-center items-center my-5'>
                  <input placeholder='Job Title' className='border border-gray-400 px-5 py-2 md:w-96 w-40 placeholder-gray-400' type="text" />
                  <button className='bg-green-800 text-white px-5 py-2 border border-green-800 hover:bg-white hover:text-green-800'>Search</button>
                </div>
              </div>
              {viewapplicationStatus &&
                allApplication?.length > 0 ? <div className='overflow-x-auto'>
                <table className='border border-gray-200'>
                  <thead>
                    <tr className='bg-blue-700 text-white'>
                      <th className="py-2 px-4">Sl.No.</th>
                      <th className="py-2 px-4">Job Title</th>
                      <th className="py-2 px-4">Name</th>
                      <th className="py-2 px-4">Qualification</th>
                      <th className="py-2 px-4">Email</th>
                      <th className="py-2 px-4">Phone</th>
                      <th className="py-2 px-4">Cover Letter</th>
                      <th className="py-2 px-4">Resume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allApplication?.map((item, index) => (
                      <tr key={index} className='border border-gray-200'>
                        <th className="py-2 px-4 border-b">{index + 1}</th>
                        <th className="py-2 px-4 border-b">{item?.jobtitle}</th>
                        <th className="py-2 px-4 border-b">{item?.fullname}</th>
                        <th className="py-2 px-4 border-b">{item?.qualification}</th>
                        <th className="py-2 px-4 border-b">{item?.email}</th>
                        <th className="py-2 px-4 border-b">{item?.phone}</th>
                        <th className="py-2 px-4 border-b">{item?.coverletter}</th>
                        <th className="py-2 px-4 border-b"><Link to={`${serverUrl}/pdfUpload/${item?.resume}`} target='_blank' className='text-blue-600 underline' >resume</Link></th>
                      </tr>))
                    }

                  </tbody>
                </table>
              </div> :
                <p>No applications</p>
              }


            </div>
          }
        </div>
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      <Footer />
    </>
  )
}

export default AdminCareers