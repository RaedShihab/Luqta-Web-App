import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    toolbar: {
      minHeight: "40px",
      paddingRight: 0 // keep right padding when drawer closed
    },
    content: {
      // display: 'flex',
      justifyContent: "center",
      // flexGrow: 1,
      height: "100%",
      overflow: "hidden",
      backgroundColor: "#F6F6F6"
    },
    h5: {
      marginBottom: theme.spacing(2)
    }
});
