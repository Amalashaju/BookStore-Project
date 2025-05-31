import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"


//register - content-type = application/json
export const registerApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/register`, reqBody)
}

export const loginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/login`, reqBody)
}

export const googleLoginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/google-login`, reqBody)
}

export const homeBookApi = async () => {
    return await commonApi('GET', `${serverUrl}/all-home-book`)
}
//-------------------------------------------------------------------------------
//                          user
//upload book



export const uploadBookApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/add-book`, reqBody, reqHeader)
}

//get all books
export const getAllBookApi = async (searchKey, reqHeader) => {
    return await commonApi('GET', `${serverUrl}/all-books?search=${searchKey}`, '', reqHeader)
}

//api to view a book
export const viewABookApi = async (id) => {
    return await commonApi('GET', `${serverUrl}/view-books/${id}`)
}


export const getAllBookAdminApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/admin-all-books`, "", reqHeader)
}

//api to approve a book
export const approveBookApi = async (reqBody, reqHeader) => {
    return await commonApi('PUT', `${serverUrl}/approve-book`, reqBody, reqHeader)

}

//api to get all users
export const getAllUsersApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/all-users`, "", reqHeader)
}

//api to add all job
export const addJobApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/add-job`, reqBody)
}

//get all jobs
export const getAllJobsApi = async (searchKey) => {
    return await commonApi('GET', `${serverUrl}/all-jobs?search=${searchKey}`)
}

//api to delete a job
export const deleteJobApi = async (id) => {
    return await commonApi('DELETE', `${serverUrl}/delete-job/${id}`)
}

//api to add applications
export const addApplicationApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/apply-job`, reqBody, reqHeader)
}

//api to get all applications
export const getAllApplicationApi = async () => {
    return await commonApi('GET', `${serverUrl}/all-application`)
}

//api to update the profile
export const updateProfileApi = async (reqBody, reqHeader) => {
    return await commonApi('PUT', `${serverUrl}/admin-profile-update`, reqBody, reqHeader)
}

//api to update the user profile 
export const updateUserProfileApi= async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/user-profile-update`,reqBody,reqHeader)
} 

//api to get all user books
export const getAllUserBookApi=async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/user-added-book`,"",reqHeader)
}

//api to get all user brought books
export const getAllUserBroughtBookApi=async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/user-brought-book`,"",reqHeader)
}


//api to delete a user book
export const deleteAUserBookApi=async(id)=>{
    return await commonApi('DELETE',`${serverUrl}/delete-user-books/${id}`)
}

//api to make payment
export const makePaymentApi = async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/make-payment`,reqBody,reqHeader)
}
