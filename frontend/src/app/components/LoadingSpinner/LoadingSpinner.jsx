import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center loading">
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </div>
  );
};

export default LoadingSpinner;
