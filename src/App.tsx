import Header from "./components/Header";
import SideBar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  bodyContainer: {
    display: "flex",
    backgroundColor: "#ecd9fb30",
  },
  pageContainer: {
    width: "100%",
    // margin: "25px 34px",
  },
});

function App() {
  return (
    <>
      <Header />
      <div {...stylex.props(styles.bodyContainer)}>
        <div {...stylex.props(styles.pageContainer)}>
          <SideBar />
          <AppRoutes />
        </div>
      </div>
    </>
  );
}

export default App;
