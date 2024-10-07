import { useEffect, useState } from "react";
import axios from "./util/axios.customize";

function App() {
  useEffect(() => {
    const fetchHelloWorld = async () => {
      const res = await axios.get(`/v1/api/`);
      console.log(">>>Check res: ", res);
    };
    fetchHelloWorld();
  }, []);
  return <>Hello World</>;
}

export default App;
