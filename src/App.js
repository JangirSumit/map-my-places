import React, { useEffect, useState } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  CssBaseline,
  Typography,
  Link,
  AppBar,
  Toolbar,
  Avatar,
  Card,
  CardContent,
  CardActions,
  Divider,
  Button,
  Box,
  Chip,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    backgroundSize: "90% 90%",
    backgroundColor: "#fafafa",
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  paddingLeft: {
    paddingLeft: "5px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

function App() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  async function fetchData(q) {
    let search = q ? `&q=${q}` : "";
    let request = fetch(
      "https://www.data.qld.gov.au/api/3/action/datastore_search?resource_id=8b9178e0-2995-42ad-8e55-37c15b4435a3" +
        search
    );
    let data = await (await request).json();
    setData(data.result.records);
  }

  useEffect(() => {
    fetchData("");
  }, [""]);

  return (
    <>
      <CssBaseline />
      <AppBar position="relative" style={{ background: "#f44336" }}>
        <Toolbar>
          <Avatar
            variant="rounded"
            src="https://jangirsumit.github.io/science-capability-directory/static/media/science%20(3).a0a6971c.png"
            className={classes.rounded}
          ></Avatar>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.paddingLeft}
          >
            RecourceFinda
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.heroContent}>
          <Container fixed>
            <LeafletMap
              center={
                data && data.length
                  ? [
                      data.filter((a) => a.Latitude && a.Longitude)[0].Latitude,
                      data.filter((a) => a.Latitude && a.Longitude)[0]
                        .Longitude,
                    ]
                  : [0, 0]
              }
              zoom={data && data.length ? 3 : 1}
              maxZoom={13}
              attributionControl={true}
              zoomControl={true}
              doubleClickZoom={true}
              scrollWheelZoom={true}
              dragging={true}
              animate={true}
              easeLinearity={0.35}
            >
              <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
              {data && data.length
                ? data.map((d, index) => (
                    <Marker position={[d.Latitude, d.Longitude]} key={index}>
                      <Popup>
                        <Card className={classes.card}>
                          {/* <CardMedia
                        className={classes.cardMedia}
                        image={card["logo_clean"]}
                        title="Image title"
                      /> */}
                          <CardContent className={classes.cardContent}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="h2"
                            >
                              {d["Centre name"]}{" "}
                              {d["Abbreviation"]
                                ? "(" + d["Abbreviation"] + ")"
                                : ""}
                            </Typography>
                            <Typography color="textSecondary">
                              {d["Overview"].length > 100
                                ? d["Overview"].substring(0, 100) + "..."
                                : d["Overview"]}
                            </Typography>
                            <b>Address</b>{" "}
                            <Box fontStyle="oblique">{d["Address"]}</Box>
                          </CardContent>
                          <div className={classes.root}>
                            {d["Sectors"].split(";").map((c) => (
                              <Chip
                                size="small"
                                color="secondary"
                                variant="outlined"
                                label={c}
                                key={c}
                              />
                            ))}
                          </div>
                          <Divider />
                          <CardActions>
                            <Button
                              size="small"
                              color="primary"
                              // onClick={handleClickOpen("paper", card)}
                            >
                              View more details
                            </Button>
                          </CardActions>
                        </Card>
                      </Popup>
                    </Marker>
                  ))
                : ""}
            </LeafletMap>
          </Container>
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          developed By
        </Typography>
        <Copyright />
      </footer>
    </>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Sumit Jangir
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default App;
