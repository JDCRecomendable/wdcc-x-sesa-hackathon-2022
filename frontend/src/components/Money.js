import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Money = () => {
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
        alt="coin."
        src="coin.png"
      />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/shop"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          marginRight: "100px",
          textDecoration: "none",
        }}
      >
        1000
      </Typography>
    </>
  );
};

export default Money;
