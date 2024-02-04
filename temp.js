// {/* <div className={classes.header}>
// <h1 className={classes.head1}>
//   Why <span className={classes.span1}>Ivy?</span>
// </h1>
// <p className={classes.para}>
//   Ivy is like a super smart AI assistant for your phone. It can hold
//   long conversations with people and sound like a real person. It never
//   forgets anything and can remember everything perfectly. Ivy is so good
//   that it can do a job without needing any training, supervision, or
//   rewards, just like a full-time worker. And the best part is, it works
//   all the time, every day.
// </p>
// <p className={classes.para}>
//   You can even give Ivy documents like Excel files, CSV files, or PDFs,
//   and it will understand them. Also, while it's on a call, it can
//   transfer the call to other number if you want.
// </p>
// {/* <PlayAudio /> */}
// <div className={classes.particlesDiv}>
//   <img
//     src={particlesImg}
//     alt="particles"
//     className={classes.particles}
//   />
// </div>
// <button className={classes.but}>
//   <a href="https://talk2ivy.netlify.app/" className={classes.talk}>
//     Talk to Ivy {">"}
//     {">"}
//   </a>
// </button>
// <button
//   className={classes.but}
//   onClick={() => {
//     navigate("/getInvite");
//   }}
// >
//   Continue {">"}
//   {">"}
// </button>
// </div> */}

// const calculateValue = () => {
//   const updatedStats = [...stats];
//   for (const dataa of data) {
//     const matchingStat = updatedStats.find(
//       (stat) => dataa.Status.toLowerCase() === stat.content.toLowerCase()
//     );
//     if (matchingStat) {
//       matchingStat.value += 1;
//     }

//     // updatedStats[4].value += dataa.humanCalls;
//     // updatedStats[4].duration += dataa.humanDuration;
//     // updatedStats[5].value += dataa.machineCalls;
//     // updatedStats[5].duration += dataa.machineDuration;
//     // updatedStats[12].value += dataa.unrespondedCalls;
//     // updatedStats[12].duration += dataa.unrespondedDuration;

//     if (dataa.typee === "Human") {
//       updatedStats[4].value += 1;
//       updatedStats[4].duration += dataa.duration;
//     }

//     if (dataa.typee === "Unresponded") {
//       updatedStats[12].value += 1;
//       updatedStats[12].duration += dataa.duration;
//     }

//     if (dataa.typee === "Voicemail" || dataa.typee === "IVR") {
//       updatedStats[5].value += 1;
//       updatedStats[5].duration += dataa.duration;
//     }
//     // }

//     if (dataa.Status !== "Pending") {
//       updatedStats[0].value += 1;
//     }
//   }
//   setStats(updatedStats);
// };
// const resetData = () => {
//   const updatedStats = [...stats];
//   for (const data of updatedStats) {
//     data.value = 0;
//     if (data.duration) {
//       data.duration = 0;
//     }
//   }
//   setStats(updatedStats);
// };

const getCallStatus = async (call, i, dataa) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/vonage/voice/handleCallEvents`,
    {
      uuid: call,
    }
  );
  if (response.data.status === "ringing") {
    ringing += 1;
  }
  if (response.data.status === "completed") {
    return "completed";
  }
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/vonage/voice/events`, {
    status: response.data.status,
    id: dataa._id,
  });
  console.log(response.data.status);
  await fetch();

  if (response.data && response.data.status) return response.data.status;
  else return "Error";
};
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// for (let record of data) {
//   let k = i;

//   try {
//     await sleep(2000);
//     ringing = 0;

//     const res = await axios.post(
//       `${process.env.REACT_APP_BACKEND_URL}/vonage/voice/handleCalls/${id}/+12053504113`,
//       // `${process.env.REACT_APP_BACKEND_URL}/vonage/voice/handleCalls/${id}/+12136541105`,
//       record
//     );
//     toast.success(`Calling ${record.Name} ${record.Number}`);
//     let callStatus;
//     if (res.data.uuid) {
//       callStatus = await getCallStatus(res.data.uuid, k, record);
//     } else {
//       callStatus = "Error";
//     }
//     // wait for 3 seconds
//     while (
//       callStatus !== "completed" &&
//       callStatus !== "Error" &&
//       callStatus !== "failed" &&
//       callStatus !== "busy" &&
//       callStatus !== "cancelled" &&
//       callStatus !== "rejected" &&
//       callStatus !== "timeout" &&
//       ringing < 30
//     ) {
//       await sleep(3000);
//       callStatus = await getCallStatus(res.data.uuid, k, record);
//     }
//   } catch (error) {
//     console.log(error);
//   }
//   i++;
// }
// fetch();
