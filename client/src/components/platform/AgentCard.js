import * as React from "react";
import { Link } from "react-router-dom";

const AgentCard = (props) => {
  return (
    <Link to={`/agent/${props.data._id}`} className="no-underline bg-white">
      <div
        className="h-[150px] w-44 lg:w-[8.5rem] md:w-[7rem] sm:w-[12rem] sm:my-3 relative border-4 border-black hover:scale-[1.05] card"
        style={{
          backgroundImage: `url(${props.data.imgPath})`,
          backgroundSize: "cover",
        }}
      >
        <div className="text">
          {props.data.name}
          <div className="subtitle">{props.data.industries}</div>
        </div>
      </div>
    </Link>
  );
  //   return (
  //     <Link
  //       to={"/agent/" + props.data._id}
  //       style={{
  //         textDecoration: "none",
  //         backgroundColor: "white",
  //         justifyContent: "center",
  //         display: "flex",
  //       }}
  //     >
  //       {/* <div
  //                 className='agentcard'
  //                 style={{
  //                     position: 'relative',
  //                     backgroundImage: `url(${props.data.imgPath})`,
  //                     backgroundSize: 'cover',
  //                 }}
  //             >
  //                 <div
  //                     // className='obsBg'
  //                     style={{
  //                         position: 'absolute',
  //                         bottom: '0',
  //                         left: '0',
  //                         borderRadius: '5px',
  //                         width: '100%'
  //                     }}
  //                 >
  //                     <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
  //                         <div style={{color: 'white', fontSize: '25px', fontWeight: 'bold', fontFamily: 'inherit'}}>{props.data.name}</div>
  //                         <div style={{color: 'white', fontSize: '12px', fontWeight: 'bold', fontFamily: 'inherit'}}>{props.data.industries}</div>
  //                         <div style={{maxWidth: '110px'}}>
  //                             {props.data.expertIn.map((tag) => {
  //                                 return (
  //                                     <Chip label={tag.type} variant="outlined" size='small' color='primary' style={{margin: '2px', color: 'black'}} />
  //                                 );
  //                             })}
  //                         </div>
  //                     </div>
  //                 </div>
  //             </div> */}
  //       <div
  //         className="card"
  //         style={{
  //           backgroundImage: `url(${props.data.imgPath})`,
  //           backgroundSize: "cover",
  //         }}
  //       >
  //         <div className="text">
  //           {props.data.name}
  //           <div className="subtitle">{props.data.industries}</div>
  //         </div>
  //       </div>
  //     </Link>
  //   );
};

export default AgentCard;
