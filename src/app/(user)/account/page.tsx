"use client";

import { Container } from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import request from "@/server";
import { UserType } from "@/types/user";
import { toast } from 'react-toastify';
import Title from "@/components/shares/Title";
import Loading from "@/components/shares/Loading";
import withAuth from "@/hoc/with-auth";


const AccountPage = () => {
  const [loadingData, setLoadingData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserType>();

  const getUserData = useCallback(async () => {
    try {
      setLoadingData(true);
      const { data } = await request.get<UserType>("auth/me");
      setData(data);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {firstName: e.currentTarget.firstName.value, lastName: e.currentTarget.lastName.value, username: e.currentTarget.username.value, phoneNumber: e.currentTarget.phoneNumber.value}
    
    try{
      setLoading(true)
      await request.put<UserType>("auth/update", userData);
      getUserData()
      toast.success('Malumotlaringiz muvafaqiyatli o\'zgartirildi', {autoClose: 1000})
    } finally {
      setLoading(false)
    }
    
  };

  return (
    <section>
      <Container maxWidth="xl" sx={{ marginTop: "100px" }}>
        <div className="text-center">
            <Title>Accaount</Title>
        </div>
        {loadingData ? <Loading /> :  <form
            onSubmit={onSubmit}
            className="w-96 h-screen m-auto"
          >
            <div className="relative float-label-input">
              <input
                required
                className="w-full md:w-96 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400"
                type="text"
                placeholder=""
                name="firstName"
                defaultValue={data?.firstName}
              />
              <label
                form="name"
                className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker"
              >
                First name
              </label>
            </div>

            <div className="relative float-label-input">
              <input
                required
                type="text"
                defaultValue={data?.lastName}
                placeholder=" "
                name="lastName"
                className="w-full md:w-96 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400"
              />
              <label
                form="name"
                className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker"
              >
                Last name
              </label>
            </div>

            <div className="relative float-label-input">
              <input
                defaultValue={data?.username}
                required
                type="text"
                placeholder=" "
                name="username"
                className="w-full md:w-96 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400"
              />
              <label
                form="name"
                className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker"
              >
                Username
              </label>
            </div>

            <div className="relative float-label-input">
              <input
                defaultValue={data?.phoneNumber}
                required
                type="text"
                name="phoneNumber"
                placeholder=" "
                className="w-full md:w-96 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400"
              />
              <label
                form="name"
                className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker"
              >
                Phone number
              </label>
            </div>

            {loading ? (
              <button
                disabled={true}
                type="button"
                className="bg-sky-600 w-full border border-none py-3 text-center rounded-[4px] text-white font-light"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline mr-3 w-4 h-4 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  ></path>
                </svg>
                Loading...
              </button>
            ) : (
              <button
                type="submit"
                className="bg-sky-600 w-full border border-none py-3 text-center rounded-[4px] text-white font-light"
              >
                Saqlash
              </button>
            )}
          </form>}
         
        {/* )} */}
      </Container>
    </section>
  );
};

const AccountPageAuth = withAuth(AccountPage)  

export default AccountPageAuth;
