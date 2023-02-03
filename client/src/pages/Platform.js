// imports
import "../styles/platform.css";
import simplelogo from "../images/simplelogo.png";
import { Link } from "react-router-dom";
import RegexAgents from "../components/platform/RegexAgents";
import { useState } from "react";
import { CircularProgress, ToggleButton } from "@mui/material";
import { useQuery } from "@apollo/client";
import { QUERY_REGEX_AGENTS } from "../utils/queries";
import AccountNav from "../components/navbar/AccountNav";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "./adminportal/platform ui/Button";

const Home = () => {
  const [toggleNav, setToggleNav] = useState(false);
  const toggleHandler = () => {
    setToggleNav(!toggleNav);
  };

  const [filterState, setFilterState] = useState("");
  const { loading, data, refetch } = useQuery(QUERY_REGEX_AGENTS, {
    variables: { key: filterState },
  });

  return (
    <>
      <div className=" bg-white">
        <header className="header ">
          <nav className="nav">
            <Link to="/">
              <img
                src={simplelogo}
                alt="vive logo"
                className="bg-white ml-7 w-24 md:w-16 "
              />
            </Link>
            <input
              className="input"
              placeholder="Search..."
              onChange={(event) => {
                setFilterState(
                  event.target.value
                    .replace(/[\\"']/g, "\\$&")
                    .replace(/\u0000/g, "\\0")
                    .replace(/\[/g, "&#91;")
                );
                refetch();
              }}
            />
            <div className={toggleNav ? "togglenav" : "togglenavElse"}>
              <Button style={"navBtn"} text={"Button"} />
              <Button style={"navBtn"} text={"Button"} />
            </div>
            <div className="userIcon">
              <AccountNav />
            </div>
            <div onClick={toggleHandler} className="toggleMenu">
              <MenuIcon
                style={{
                  marginRight: "10px",
                  fontSize: "35px",
                  color: "whitesmoke",
                  backgroundColor: "black",
                }}
              />
            </div>
          </nav>
        </header>
        <main className="main">
          {/* left Nav */}
          <div className="leftNavContainer">
            <div className="leftBtnContainer">
              <Button style={"leftNavBtn"} text={"Button"} />
              <Button style={"leftNavBtn"} text={"Button"} />
              <Button style={"leftNavBtn"} text={"Button"} />
              <Button style={"leftNavBtn"} text={"Button"} />
            </div>
            <div className="flex-[30%] flex-col flex justify-center items-center  smd:absolute smd:top-[34rem] sm:top-[34rem] ">
              <div className="h-[100px] bg-yellow-600 w-60 lg:w-[11rem] md:w-24 smd:w-[20rem]">
                ads
              </div>
            </div>
          </div>
          {/* Right side */}
          <div className="rightContent">
            <div className="flex-[10%] mt-7 smd:mt-0 sm:mt-7  flex items-center justify-center">
              <h1 className="text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-bold shadow-lg">
                BANNER
              </h1>
            </div>
            <div className="mb-3 flex-[90%] flex-col flex justify-evenly">
              {loading ? <CircularProgress /> : <RegexAgents data={data} />}
            </div>
          </div>
        </main>
      </div>
    </>
  );

  //   return (
  //     <>
  //       <div style={{ minHeight: "95vh", backgroundColor: "white" }}>
  //         <div
  //           style={{
  //             minHeight: "15vh",
  //             backgroundColor: "white",
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "center",
  //           }}
  //         >
  //           <Link to="/">
  //             <img
  //               src={simplelogo}
  //               alt="vive logo"
  //               style={{ margin: "20px", maxHeight: "13vh", maxWidth: "22vw" }}
  //             />
  //           </Link>
  //           <input
  //             style={{}}
  //             className="searchBar"
  //             placeholder=""
  //             onChange={(event) => {
  //               setFilterState(
  //                 event.target.value
  //                   .replace(/[\\"']/g, "\\$&")
  //                   .replace(/\u0000/g, "\\0")
  //                   .replace(/\[/g, "&#91;")
  //               );
  //               refetch();
  //             }}
  //           />
  //           {/* <div className='tagBtn'>Hey</div> */}
  //           <AccountNav />
  //           {/* <div style={{width: '40vw', display: 'flex', justifyContent: 'end', marginRight: '2vw'}}>
  //                     <AccountNav />
  //                 </div> */}
  //         </div>
  //         <div
  //           style={{
  //             minHeight: "80vh",
  //             backgroundColor: "white",
  //             display: "flex",
  //             justifyContent: "center",
  //           }}
  //         >
  //           <div style={{ minHeight: "80vh", width: "100vw" }}>
  //             {loading ? <CircularProgress /> : <RegexAgents data={data} />}
  //           </div>
  //         </div>
  //       </div>
  //       {/* <div style={{backgroundColor: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '95vh'}}>
  //             <Link to='/'><img src={vortexlogo} alt='vive logo' style={{margin: '20px'}} /></Link>
  //             <input placeholder='Search' onChange={(event) => {
  //                 setFilterState(event.target.value);
  //                 refetch();
  //             }} />
  //             {loading ? (<CircularProgress />) : (<RegexAgents data={data}/>)}
  //         </div> */}
  //     </>
  //   );
};

export default Home;
