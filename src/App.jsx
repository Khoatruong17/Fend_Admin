import { useEffect, useContext } from "react";
import axios from "./util/axios.customize";
import Headers from "./components/layout/header";
import Footer from "./components/layout/footer/Footer";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./components/context/auth.context";
import { Spin} from "antd"

function App() {
  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext)

  useEffect(() => {
    const fetchAccount = async () => {
      setAppLoading(true);
      const res = await axios.get(`/v1/api/account`);
      console.log(">>>Check res: ", res);
      if (res) {
        setAuth({
          isAuthenticated: true,
          user: {
            email: res?.email ?? "",
            username: res?.name ?? "",
          }
        })
      }
      setAppLoading(false);
    };
    fetchAccount();
  }, []);
  return (
    <>{appLoading === true ?
      <div style ={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5'
      }}>
        <Spin size="large" />
      </div>
      :
      <>
        <Headers />
        <Outlet />
        <Footer />
      </>
    }
    </>
  );
}

export default App;
