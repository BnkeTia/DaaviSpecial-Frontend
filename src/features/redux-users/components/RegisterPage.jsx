import React, { useState } from "react";
import axios from "axios";
// import { useQuery } from '@tanstack/react-query'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { register as read } from './user/myUserSlice'
import myUserSlice from "../myUserSlice";

import { register as read } from "../myUserSlice";
import Layout from "../Layout";
// import { register as read } from "   /features/redux-users/myUserSlice";

const RegisterPage = () => {
  let mine = {};
  const navigate = useNavigate();
  //
  const dispatch = useDispatch();
  const { registered, loading } = useSelector((state) => state.myuser);
  console.log("registered: " + registered);
  //
  const see = "mee";
  // const [formData, setFormData] = useState({
  //   first_name: '',
  //   last_name: '',
  //   email: '',
  //   password: '',
  // })
  // const { first_name, last_name, email, password } = formData

  // const { isLoading, error, data } = useQuery({
  //   queryKey: ['repoData'],
  //   queryFn: () => fetch('').then((res) => res.json()),
  // })

  // if (isLoading) return 'Loading...'

  // if (error) return 'An error has occurred: ' + error.message

  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value })
  // }

  // const onSubmit = (e) => {
  //   e.preventDefault()
  //   axios
  //     .post('http://localhost:8000/api/users/register', formData)
  //     .then((response) => {
  //       console.log('Success', response.data)
  //       mine = response.data
  //     })
  //     .catch((err) => {
  //       console.log('eror ', err)
  //     })

  //   // dispatch(register({ first_name, last_name, email, password }))
  // }

  const schema = yup.object().shape({
    username: yup.string().required("your fullname is required"),
    email: yup.string().email().required("your email is required"),
    password: yup.string().min(4).max(20).required("enter password"),
  });

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    console.log("form", data);
    // let mydata = {
    //   first_name: data.first_name,
    //   last_name: data.last_name,
    //   email: data.email,
    //   password: data.password,
    // }
    const username = data.username;
    const email = data.email;
    const password = data.password;
    // axios
    //   .post('http://localhost:8000/api/users/register', {
    //     first_name: data.first_name,
    //     last_name: data.last_name,
    //     email: data.email,
    //     password: data.password,
    //   })
    //   .then((response) => {
    //     console.log('Success', response.data)
    //     mine = response.data
    //   })
    //   .then((response) => {})
    //   .catch((err) => {
    //     console.log('error', err)
    //   })
    // const first_name = data.first_name
    // const last_name = data.last_name
    // const email = data.email
    // const password = data.password

    dispatch(
      read({
        username,
        email,
        password,
        // first_name: data.first_name,
        // last_name: data.last_name,
        // email: data.email,
        // password: data.password,
      })
    );
    if (registered) return <Navigate to="/psignin" />;
    navigate("/psignin");
  };

  if (registered) return <Navigate to="/psignin" />;

  return (
    <Layout>
      <div className="mx-auto max-w-4xl">


        <div>

          <form
            className="w-full  p-8"
            onSubmit={handleSubmit(submitForm)}
          >
            <h1 className="text-3xl font-bold text-center mb-8">Register</h1>
            <div className="-mx-3 mb-6 flex flex-wrap">
              <div className="w-full px-3">
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  for="first_name"
                >
                  Username
                </label>
                <input
                  className="mb-3 block w-full appearance-none rounded border border-red-500 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                  id="username"
                  name="username"
                  type="text"
                  placeholder="enter name"
                  {...register("username")}
                />

                {(errors.username || errors.last_name) && (
                  <p className="text-xs italic text-red-500">
                    enter name
                  </p>
                )}
              </div>
              <div className="w-full px-3">
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  for="email"
                >
                  email
                </label>
                <input
                  type="email"
                  className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="email"
                  name="email"
                  {...register("email")}
                  placeholder="example@email.com"
                />
                <p className="text-xs italic text-red-500">
                  {errors.email?.message}
                </p>
              </div>
              <div className="w-full px-3">
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  for="password"
                >
                  Password
                </label>
                <input
                  className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="password"
                  name="password"
                  type="password"
                  {...register("password")}
                  placeholder="******************"
                />
                <p className="text-xs italic text-red-500">
                  {errors.password?.message}
                </p>
                {!errors.password && (
                  <p className="text-xs italic text-gray-600">
                    Make it as long and as crazy as you'd like
                  </p>
                )}
              </div>
            </div>
            {loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <input
                type="submit"
                value="Create Account"
                className="btn btn-primary success mt-4"
              />
            )}
            <div className="text-center mt-4 mb-6 text-gray-400 italic">
              Register now for exclusive benefits!
            </div>


          </form>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
