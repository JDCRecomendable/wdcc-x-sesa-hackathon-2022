import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import ConfirmPurchase from "./ConfirmPurchase";

const Shields = () => {
  return (
    <>
      <Box
        component="img"
        noWrap
        sx={{
          display: { xs: "none", md: "flex" },
          mr: 1,
          width: "20px",
        }}
        alt="shield."
        src="shield.png"
      />
      <Box
        component="img"
        noWrap
        sx={{
          display: { xs: "none", md: "flex" },
          mr: 1,
          width: "20px",
        }}
        alt="shield."
        src="shield.png"
      />
      <Box
        component="img"
        noWrap
        sx={{
          display: { xs: "none", md: "flex" },
          mr: 1,
          width: "20px",
          opacity: 0.5,
        }}
        alt="shield."
        src="shield.png"
      />
      <Tooltip title="Purchase a shield">
        <Typography
          variant="h6"
          noWrap
          component="a"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 800,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            marginRight: "250px",
          }}
        >
          <ConfirmPurchase />
        </Typography>
      </Tooltip>
    </>
  );
};

export default Shields;
