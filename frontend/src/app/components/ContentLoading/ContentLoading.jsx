import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const ContentLoading = ({ height }) => {
  return (
    <div className={`flex items-center justify-center min-h-${height} loading`}>
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </div>
  );
};

export default ContentLoading;
