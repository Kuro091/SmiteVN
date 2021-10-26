import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Chip } from "@mui/material";

export default function MultiActionAreaCard({ godData, setOpen, setGodId }) {
  return (
    <Card
      onClick={() => {
        setGodId(godData._id);
        setOpen(true);
      }}
      sx={{
        textAlign: "center",
        marginRight: 5,
        marginBottom: 5,
        width: 150,
        maxWidth: 345,
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={godData.godIconUrl}
          alt={godData.name}
        />
        <CardContent>
          <Chip label={godData.name} size="large" variant="outlined" />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
