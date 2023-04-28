import {
  Box,
  Button,
  Container,
  Grow,
  Typography,
  useTheme,
} from "@mui/material";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import albumLogo from "../../assets/img/hiclipart.com.png";
import postsLofo from "../../assets/img/community.webp";
const HomePage: FC = () => {
  const theme = useTheme();

  const { pathname } = useLocation();
  return (
    <Container>
      <Grow in={pathname === "/"}>
        <Box display="flex" flexDirection="column" gap="120px">
          <Typography
            textAlign="center"
            variant="h2"
            fontWeight="600"
            color={theme.palette.primary.dark}
          >
            Welcome to Posts App
          </Typography>

          <Box display="flex" justifyContent="start" height="600px">
            <Box
              display="flex"
              flexDirection="column"
              paddingBottom="60px"
              gap="30px"
              flex="0 1 50%"
            >
              <Typography variant="h4" color={theme.palette.primary.main}>
                POSTS
              </Typography>
              <Typography
                variant="body1"
                fontSize="25px"
                alignSelf="center"
                color={theme.palette.grey[600]}
              >
                Learn how to easily view posts and create comments in a fast and
                efficient way, making it easy for you to stay up-to-date with
                the latest content and add your own thoughts to the
                conversation.
              </Typography>
              <Link
                to="/posts"
                style={{ alignSelf: "start", marginTop: "auto" }}
              >
                <Button variant="contained" size="large">
                  View posts
                </Button>
              </Link>
            </Box>
            <img src={postsLofo} alt="logo" style={{ maxWidth: "600px" }} />
          </Box>


          <Box display="flex" justifyContent="start" height="600px">
            <Box
              display="flex"
              flexDirection="column"
              paddingBottom="60px"
              gap="30px"
              flex="0 1 50%"
            >
              <Typography variant="h4" color={theme.palette.primary.main}>
                ALBUMS
              </Typography>
              <Typography
                variant="body1"
                fontSize="25px"
                alignSelf="center"
                color={theme.palette.grey[600]}
              >
                Explore our photo albums and see some of our most memorable
                moments captured on camera. Browse through our collection to
                check out our latest photos and relive our favorite memories.
              </Typography>
              <Link
                to="/posts"
                style={{ alignSelf: "start", marginTop: "auto" }}
              >
                <Button variant="contained" size="large">
                  View albums
                </Button>
              </Link>
            </Box>
            <img src={albumLogo} alt="logo" style={{ maxWidth: "600px" }} />
          </Box>
        </Box>
      </Grow>
    </Container>
  );
};

export default HomePage;
