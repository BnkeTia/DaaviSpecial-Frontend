// import { mytoken } from 'features/user/myUserSlice'
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import AuthContext from "app/context/AuthContext";
// import AuthContext from "../app/context/AuthContext";
import Layout from "../Layout";
import { mytoken, tokenLogin } from "@/features/redux-users/myUserSlice";
const LoginD = () => {
  let { loginUser, loginMyUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const { registered, loading } = useSelector((state) => state.myuser)

  const schema = yup.object().shape({
    // first_name: yup.string().required('your fullname is required'),
    // last_name: yup.string().required('your fullname is required'),
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

  const submitFormer = (e) => {
    // e.preventDefault()
    loginUser(e);
  };

  const submitForm = (data) => {
    console.log("form", data);

    // let mydata = {
    //   first_name: data.first_name,
    //   last_name: data.last_name,
    //   email: data.email,
    //   password: data.password,
    // }
    // const first_name = data.first_name
    // const last_name = data.last_name

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
    //
    //
    // //
    // const email = data.email
    // const password = data.password
    // loginUser(data)
    dispatch(tokenLogin(data));

    // dispatch(
    //   myaccess({
    //     email,
    //     password,
    //     // first_name: data.first_name,
    //     // last_name: data.last_name,
    //     // email: data.email,
    //     // password: data.password,
    //   }),
    // )
    // if (registered) return <Navigate to="/login" />
    navigate("/login");
  };

  //   if (registered) return <Navigate to="/login" />
  return (
    <Layout>
      <div>
        <form
          className="w-full max-w-lg p-8"
          onSubmit={handleSubmit(submitForm)}
        // onSubmit={submitFormer}
        >
          <div className="-mx-3 mb-6 flex flex-wrap "></div>
          <div className="-mx-3 mb-6 flex flex-wrap">
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
          <input type="submit" value="Submit" className="btn success" />
        </form>
      </div>
    </Layout>
  );
};

export default LoginD;
