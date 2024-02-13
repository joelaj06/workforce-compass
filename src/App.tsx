import Header from "./components/Header";
import SideBar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Header />
      <div>
        <div className="flex">
          <SideBar />
          <div className="w-full m-25px 34px bg-skin-shade50">
            <AppRoutes />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
