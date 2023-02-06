import { Grid } from "@mui/material";
import AgentCard from "./AgentCard";

const RegexAgents = ({ data }) => {
  return (
    <>
      <div className=" flex flex-col justify-evenly">
        <div className="grid grid-cols-4 justify-items-center  sm:grid-cols-2">
          {data.regexAgents.map((agent) => {
            return (
              <>
                <AgentCard key={agent._id} data={agent} />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
  // return (
  //   <>
  //     <Grid container width="100vw" display="flex" justifyContent="center">
  //       {data.regexAgents.map((agent) => {
  //         return (
  //           <>
  //             <Grid
  //               item
  //               xs={9}
  //               md={4}
  //               lg={3}
  //               xl={2}
  //               margin={1}
  //               key={agent._id}
  //               sx={{ backgroundColor: "white" }}
  //             >
  //               <AgentCard key={agent._id} data={agent} />
  //             </Grid>
  //           </>
  //         );
  //       })}
  //     </Grid>
  // </>
  // );
};

export default RegexAgents;
