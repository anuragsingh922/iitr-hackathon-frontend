import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Userdata = () => {
  const { id } = useParams();
  const [tableData, setTableData] = useState();
  const nav = useNavigate();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/campaign/user-data/${id}`
      );
      setTableData(data);
    } catch (error) {
      console.log(error);
      // toast.error("Unable to fetch");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    // { field: "timesCalled", headerName: "Times Called", width: 120 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
    },
    {
      field: "recordingUrl",
      headerName: "Recording Url",
      width: 430,
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 130,
    },
    {
      field: "typee",
      headerName: "Type",
      width: 130,
    },
    {
      field: "createdAt",
      headerName: "Date & Time",
      width: 200,
      valueFormatter: (params) => {
        if (!params.value) return "-";
        const createdAt = new Date(params?.value);
        return createdAt?.toLocaleString(); // This will format the date and time in a locale-specific, human-readable format
      },
    },
  ];

  return (
    <Box sx={{ mt: 4, px: 3 }}>
      <DataGrid
        onRowClick={(e) => {
          if (e.row.recordingUrl === "") return;
          nav(`/details/${id}/${e.id}`);
        }}
        getRowId={(row) => row._id}
        rows={tableData || []}
        getRowHeight={() => "auto"}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
        sx={{ "& .MuiDataGrid-cell": { py: "15px" } }}
      />
    </Box>
  );
};

export default Userdata;
