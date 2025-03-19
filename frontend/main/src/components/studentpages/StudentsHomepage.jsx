import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/userSlice";
import Studentpage from "./Studentpage";
import api from "../../api";

export default function StudentsHomepage() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("app3/profileview/");
        const data = response.data;


        dispatch(
          setUser({
            ...userState,
            name: data.student_name,
            regnum: data.student_reg,
            email: data.student_email,
            year: data.student_year,
            course: data.student_course,
            profile: data.student_profile
          })
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [dispatch]);




  return (

    <Studentpage name={userState.name} profile={userState.profile} register={userState.regnum} />

  );
}
