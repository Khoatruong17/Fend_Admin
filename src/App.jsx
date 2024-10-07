import { useEffect, useState } from "react";
import axios from "./util/axios.customize";
import Headers from "./components/header";
import { Outlet } from "react-router-dom";

function App() {
  useEffect(() => {
    const fetchHelloWorld = async () => {
      const res = await axios.get(`/v1/api/`);
      console.log(">>>Check res: ", res);
    };
    fetchHelloWorld();
  }, []);
  return (
    <>
      <Headers />
      <Outlet />
    </>
  );
}

export default App;
