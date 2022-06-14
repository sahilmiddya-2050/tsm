import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { getJokes } from "../../redux/actions";

import styles from "./style.module.css";

const JokesSpotComponent = () => {
  const dispatch = useDispatch();

  const { isLoading, jokes } = useSelector((state) => state.jokes);

  console.log({ isLoading, jokes });

  useEffect(() => {
    dispatch(getJokes({}));
  }, []);

  if (isLoading === true) {
    return (
      <Container
        sx={{ display: "flex", justifyContent: "center" }}
        className={styles.root}
      >
        <CircularProgress color="secondary" size={100} sx={{ mt: 10 }} />
      </Container>
    );
  }

  if (isLoading === false && Array.isArray(jokes) && jokes.length > 0) {
    return (
      <Container sx={{ mb: 5 }} className={styles.root}>
        <Typography variant="h2" color="secondary" sx={{ mt: 2, mb: 3 }}>
          Jokes
        </Typography>
        <Grid container spacing={4}>
          {jokes.map((joke) => (
            <Grid item key={joke?.id} xs={12} sm={12} md={12} lg={6}>
              <JokesCard joke={joke} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Container className={styles.root}>
      <Typography color="secondary" variant="h1" align="center" sx={{ mt: 10 }}>
        No Jokes Found !
      </Typography>
    </Container>
  );
};

export default JokesSpotComponent;

const JokesCard = ({ joke }) => {
  const jokeTypes = () => {
    let type = "";
    const flags = Object.keys(joke?.flags).filter(
      (f) => joke.flags[f] === true
    );

    flags.map((f) => {
      type += `/ ${f} `;
      return 0;
    });

    return type;
  };

  console.log(jokeTypes());

  return (
    <Card elevation={4} sx={{ width: "100%" }}>
      <CardHeader
        title={joke?.category + " Joke"}
        subheader={joke?.type + " " + jokeTypes()}
      />

      <CardContent>
        <Typography
          dangerouslySetInnerHTML={{ __html: joke?.joke }}
          variant="body1"
          style={{ fontSize: 20 }}
        />
        {/* {joke?.joke} */}
      </CardContent>
    </Card>
  );
};
