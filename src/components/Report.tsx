import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { getAll } from "../fetch";

interface Medications {
  medication1: string;
  medication2: string;
  medication3: string;
  medication4: string;
  medication5: string;
  medication6: string;
  medication7: string;
  medication8: string;
  medication9: string;
  medication10: string;
  medication11: string;
  medication12: string;
  medication13: string;
  medication14: string;
  medication15: string;
}

interface ApiComponent {
  medications: Medications;
  timestamp: number;
  username: string;
  _id: string;
}

function Report() {
  const username = window.location.pathname.split("/")[2];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});

  React.useEffect(() => {
    getAll(username)
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(typeof data, data);

  return (
    <div>
      <div>Report</div>
      <div>{loading ? <CircularProgress /> : <div></div>}</div>

      {/* <table className="table table-auto border-2"> */}
      {/*   <thead> */}
      {/*     <tr> */}
      {/*       <th>Timestamp</th> */}
      {/*       <th>Name</th> */}
      {/*       <th>id</th> */}
      {/*       <th>medication</th> */}
      {/*     </tr> */}
      {/*   </thead> */}

      {/*   <tbody> */}
      {/*    */}
      {/*   </tbody> */}
      {/* </table> */}

      <div>
        {data ? (
          data.map((ele: ApiComponent, i: number) => {
            return (
              <div key={i}>
                <h3>{ele.username}</h3>
                <span>{ele.timestamp}</span>
                <span>{ele._id}</span>
                <span>
                  {ele.medications &&
                    ele.medications.map((data) => (
                      <div key={i}>
                        <ul>{data.medication1}</ul>
                        <ul>{data.medication2}</ul>
                        <ul>{data.medication3}</ul>
                        <ul>{data.medication4}</ul>
                      </div>
                    ))}
                </span>
              </div>
            );
          })
        ) : (
          <tr>{error}</tr>
        )}
      </div>
    </div>
  );
}

export default Report;
