import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import ConfirmPurchase from "./ConfirmPurchase";
const axios = require("axios");

const Shields = () => {
  let numOfShields = 2;
  let brokenShields = 3 - numOfShields;

  const getResponse = async () => {
    try {
      const response = await axios.get(
        "http://ripscamera0c.pythonanywhere.com/app/Alpha/room"
      );
      numOfShields = response.data.numberOfShields;
    } catch (err) {
      console.log("err");
    }
  };

  getResponse();

  const purchase = () => {};

  let shields = (
    <>
      {[...Array(numOfShields)].map((e, i) => {
        return (
          <Box
            component="img"
            noWrap
            key={i}
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              width: "20px",
              opacity: 1,
            }}
            alt="shield."
            src="shield.png"
          />
        );
      })}
    </>
  );

  let broken = (
    <>
      {[...Array(brokenShields)].map((e, i) => {
        return (
          <Box
            component="img"
            noWrap
            key={i}
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              width: "20px",
              opacity: 0.5,
            }}
            alt="shield."
            src="shield.png"
          />
        );
      })}
    </>
  );

  return (
    <>
      {shields}
      {brokenShields > 0 && broken}

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
          <ConfirmPurchase
            name="Shield"
            price="100"
            description="Shields will protect you from attacks from other users."
            buttonText="+"
            purchase={purchase}
          />
        </Typography>
      </Tooltip>
    </>
  );
};

export default Shields;
