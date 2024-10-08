import { ThemeProvider, createTheme } from "@mui/material";
import Header from "./components/Header";
import SideBar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Poppins",
    },
    palette: {
      primary: {
        main: "#0a8686",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="min-w-full h-screen max-h-screen">
          <div className="w-full h-full flex">
            <div className="w-1/6 h-screen max-h-screen">
              <div className="w-full h-screen">
                <SideBar />
              </div>
            </div>
            <div className="w-5/6 h-screen relative overflow-y-auto hide-scrollbar">
              <div className="w-full min-h-full text-gray-500 relative ">
                <div className="sticky z-20 w-full top-0">
                  <Header />
                </div>
                <div className="p-5">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
