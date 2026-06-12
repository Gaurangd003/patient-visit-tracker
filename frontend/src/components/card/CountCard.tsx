import { Card, CardContent } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const CountCard = ({
  count,
  entity,
  img,
}: {
  count: number;
  entity: string;
  img: string;
}) => {
  return (
    <Card
      sx={{
        gridColumn: { md: "span 1", xs: "span 3" },
        borderRadius: 4,
        cursor: "pointer",
        border: "1px solid #E2E8F0",
        background:
          "linear-gradient(135deg, #FFFFFF 0%, #c5f6de 100%)",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              {entity}
            </Typography>

            <Typography
              variant="h3"
              sx={{
                mt: 1,
                fontWeight: 700,
                color: "#1E293B",
              }}
            >
              {count}
            </Typography>
            <Typography
              component={NavLink}
              to={"/" + entity}
              sx={{
                display: "block",
                mt: 4,
                color: "#15663f",
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none"
              }}
            >
              View Details →
            </Typography>
          </Box>
          <Box component="img" src={img} alt={entity} sx={{ width: 140, display: { xs: "none", sm: "block" }, objectFit: "contain" }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CountCard;