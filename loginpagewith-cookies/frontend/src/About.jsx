import React, { useEffect, useState } from "react";
import './App.css';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const history = useNavigate();
    const [user, setUser] = useState({})

    const callAboutPage = async () => {

        try {
            const res = await fetch('/api/about', {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await res.json()
            setUser(data)
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }


        } catch (error) {
            history('/login')
            console.log("error effect ::" + error)
        }
    }


    useEffect(() => {
        callAboutPage();
    }, []);
    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                <div className="max-w-4xl mx-auto py-8">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-3xl font-semibold mb-4">Welcome, Mr. {user.name}</h2>
                        <div className="border-b border-gray-300 pb-4">
                            <h3 className="text-xl font-semibold mb-2">Admin Details</h3>
                            <table className="table-auto w-full">
                                <tbody>
                                    <tr>
                                        <td className="py-2 px-4 font-semibold">Name</td>
                                        <td className="py-2 px-4">{user.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 font-semibold">Email</td>
                                        <td className="py-2 px-4">{user.email}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 font-semibold">Phone Number</td>
                                        <td className="py-2 px-4">{user.phonenumber}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 font-semibold">Location</td>
                                        <td className="py-2 px-4">Delhi</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>



            {/* <div>
                <div className='cardapp'>
                    <h2>Welcome Mr: {user.name} </h2>
                    <div className='formc' >

                        <table className="table1" >
                            <tr>
                                <th colspan="3"><h2>Admin Details</h2></th>
                            </tr>
                            <tr>
                                <th className="th1">1.</th>
                                <th className="th2">Name  </th>
                                <td className="td1">{user.name}</td>
                            </tr>
                            <tr>
                                <th className="th1">2.</th>
                                <th className="th2">Email  </th>
                                <td className="td1">{user.email}</td>
                            </tr>
                            <tr>
                                <th className="th1">3.</th>
                                <th className="th2">Phone Number  </th>
                                <td className="td1">{user.phonenumber}</td>
                            </tr>
                            <tr>
                                <th className="th1">4.</th>
                                <th className="th2">Location </th>
                                <td className="td1">Delhi</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div> */}
        </>
    )
}
export default About;
