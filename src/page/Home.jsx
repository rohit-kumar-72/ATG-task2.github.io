import React, { useEffect, useState } from 'react'
import { apiConnector } from '../services/apiConnector';
import "../App.css"
import { IoClose } from 'react-icons/io5';

function Home() {

    const [apidata, setApiData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [detail, setDetail] = useState(null);

    useEffect(() => {
        async function fetchdata() {
            setLoading(true);
            const url = 'https://602e7c2c4410730017c50b9d.mockapi.io/users';

            try {
                const response = await apiConnector(
                    "GET",
                    url,
                )
                if (!response) {
                    throw new Error("NO RESPONSE FROM API")
                }
                // console.log("FETCH API DATA RESPONSE: ", response);
                if (response.data) {
                    setApiData(response.data)
                }
            } catch (error) {
                console.log("FETCH API DATA ERROR: ", error);
            }
            setLoading(false);
        }
        fetchdata();
    }, [])

    function handleImageError(e) {
        e.target.src = "https://imgs.search.brave.com/nU5Zp-hj_ifiTe0chiLZc_Pjc278N7Li7WzVSOs5e_M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8w/OC8wOC8wOS8xNy9h/dmF0YXItMTU3Nzkw/OV8xMjgwLnBuZw"
    }

    function viewProfileHandler(id) {
        const user = apidata.filter((user) => user.id === id)[0];
        // console.log(id)
        // console.log(user)
        if (user) {
            setDetail(user);
        }
        console.log(detail)
    }
    // console.log(detail)
    return (
        <div className='w-11/12 mx-auto py-4 mt-4 lg:mt-12 rounded-lg'>
            {
                loading
                    ? <div className='flex justify-center items-center gap-4 h-[100vh]'>
                        <div className="spinner"></div>
                        <h1 className='text-4xl'>Loading...</h1>
                    </div>
                    :
                    <div className='grid'>
                        {
                            (apidata.length > 0)
                                ? <div className='w-11/12 mx-auto'>
                                    <h1 className='text-4xl border-b-2 border-b-blue-950 text-black font-bold p-2 md:p-4'>ALL USERS</h1>
                                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4 mt-5 md:mt-10">
                                        {
                                            apidata.map((data, index) => (
                                                <div className="rounded-lg p-4 py-6 grid place-items-center shadow-xl shadow-blue-100 bg-white hover:scale-105 transition-all h-[320px]" key={index}>
                                                    <div className="rounded-full p-1">
                                                        <img
                                                            src={data.avatar}
                                                            alt="profile"
                                                            onError={handleImageError}
                                                            className='rounded-full w-[100px] shadow-md shadow-gray-300'
                                                        />
                                                    </div>
                                                    <h3
                                                        className='text-lg font-extrabold text-center'
                                                    >{data.profile.firstName} {data.profile.lastName}</h3>
                                                    <h3
                                                        className='text-lg text-[#bfc1c7] font-medium text-center mb-2 word-wrap w-[180px] overflow-hidden'
                                                    >@{data.profile.username}</h3>
                                                    <button
                                                        type='button'
                                                        className='px-6 py-3 bg-blue-500 font-semibold rounded-lg text-white cursor-pointer'
                                                        onClick={() => viewProfileHandler(data.id)}
                                                    >
                                                        View Profile
                                                    </button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                : <div className="text-4xl">
                                    No Data Found
                                </div>
                        }

                    </div>
            }
            {
                detail && <div className='animate__animated animate__slideInRight idcard w-[300px] fixed right-0 top-0 min-h-full bg-white shadow-md shadow-blue-400 p-4'>
                    <div className="h-15 z-10 mb-20 bg-white cursor-pointer" onClick={() => setDetail(null)}>
                        <IoClose className='text-2xl' />
                    </div>
                    <div className="relative">
                        <div className="id-card-tag"></div>
                        <div className="id-card-tag-strip"></div>
                        <div className="id-card-hook"></div>
                        <div className="id-card-holder">
                            <div className="id-card">
                                <div className="photo">
                                    <img src={detail.avatar}
                                        alt="profile"
                                        onError={handleImageError}
                                        className='rounded-full w-[150px] shadow-md shadow-gray-300'
                                    />
                                </div>
                                <h2
                                    className='text-lg font-extrabold text-center'
                                >{detail.profile.firstName} {detail.profile.lastName}</h2>
                                <h3
                                    className='mx-auto text-xs italic text-center mb-2 word-wrap w-[180px] overflow-hidden'
                                >{detail.profile.email}</h3>
                                <hr />
                                <p className='text-xs'><strong>JOB TITLE :</strong> {detail.jobTitle}</p>
                                <p className='text-xs'><strong>BIO :</strong> {detail.Bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Home