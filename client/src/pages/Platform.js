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
import Button from "../components/platform/platform ui/Button";
import Tagz from "../components/platform/Tag";
import vortexlogo from '../images/vortexlogo.png'

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
          <nav className="nav" style={{width: '97vw'}}>
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
              <Link to='/'><Button style={"navBtn"} text={"Vive Consulting"} /></Link>
              <Link to='/'><Button style={"navBtn"} text={"Other Link"} /></Link>
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
          <Tagz />

          {/* Right side */}
          <div className="rightContent">
            <div className="flex-[10%] mt-7 smd:mt-0 sm:mt-7  flex items-center justify-center">
              <div style={{
                backgroundColor: 'black', 
                width: '60vw', 
                height: '90px', 
                color: 'white', 
                fontWeight: 'bold', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                borderRadius: '5px',
                padding: '80px'
              }}>
                <img src={vortexlogo} alt='vortex banner'/>
              </div>
            </div>
            <div className="mb-3 flex-[90%] flex-col flex mt-5">
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
