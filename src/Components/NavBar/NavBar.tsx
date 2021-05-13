import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Icon from "@material-ui/core/Icon";
import { showCreateToDoBoxDialogue } from "../../Action/CreateToDoBoxVisibleAction";

//import "./Home.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const NavBar: React.FC = () => {
  const classes = useStyles();
  const dispatched = useDispatch();

  const handleCreateItemClick = () => {
    dispatched(showCreateToDoBoxDialogue());
  };

  return (
    <>
      <AppBar style={{ backgroundColor: "#FE658D" }} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            ASTS ToDo App
          </Typography>
          <Button color="inherit" onClick={handleCreateItemClick}>
            {" "}
            <Icon style={{ color: "white", marginRight: 6 }}>
              add_circle
            </Icon>{" "}
            Create an item
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
