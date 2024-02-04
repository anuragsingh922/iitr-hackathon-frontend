import { useNavigate } from "react-router-dom";
import classes from "../css/campaigns.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import axios from "axios";
import { useZustandStore } from "../store/store";

const Campaigns = (props) => {
  const navigate = useNavigate();
  const { excelData, setExcelData, setRefetch, refetch } = useZustandStore();
  const handleClickBtn = async () => {
    navigate(`/file/${props.id}`);
  };
  const deleteCampaign = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/campaign/delete`,
        {
          id: props.id,
        }
      );
      let updatedExcelData = [...excelData];
      updatedExcelData = updatedExcelData.filter(
        (item) => item._id !== data._id
      );
      setExcelData(updatedExcelData);
      setRefetch(!refetch);
      toast.success("Deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting campaign");
    }
  };

  return (
    <>
      <div className={classes.main}>
        <div className={classes.name}>
          <p className={classes.title} onClick={handleClickBtn}>
            {props.title}
          </p>
          {/* <div>
            <DeleteIcon onClick={deleteCampaign} sx={{ cursor: "pointer" }} />
          </div> */}
        </div>
        <p className={classes.date}>
          {props.length} leads ● created on {props.date}
        </p>
      </div>
    </>
  );
};

export default Campaigns;
