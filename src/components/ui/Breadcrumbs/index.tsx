import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import { CustomizedLastItem, CustomizedLink } from "./styled";

const NavigationBar = () => {
  const { pathname } = useLocation();
  const currentPathname = pathname.split("/").filter((item) => item);

  return (
    <Container sx={{ paddingTop: "20px" }}>
      <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb">
        {currentPathname.length ? (
          <CustomizedLink to="/">Home</CustomizedLink>
        ) : (
          <CustomizedLastItem>Home</CustomizedLastItem>
        )}
        {currentPathname.map((item, index) => {
          const lastItem = index === currentPathname.length - 1;

          const to = currentPathname.slice(0, index + 1).join("/");
          return lastItem ? (
            <CustomizedLastItem key={to}>{item}</CustomizedLastItem>
          ) : (
            <CustomizedLink to={to} key={to}>
              {item}
            </CustomizedLink>
          );
        })}
      </Breadcrumbs>
    </Container>
  );
};

export default NavigationBar;
