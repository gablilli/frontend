import { alpha, Button, IconButton, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useHotkeys } from "react-hotkeys-hook";
import { Trans, useTranslation } from "react-i18next";
import { setSearchPopup } from "../../../redux/globalStateSlice.ts";
import { useAppDispatch } from "../../../redux/hooks.ts";
import Search from "../../Icons/Search.tsx";

export const KeyIndicator = styled("code")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
  border: `1px solid ${theme.palette.divider}`,
  boxShadow:
    theme.palette.mode === "light"
      ? "0 1px 1px rgba(0, 0, 0, 0.2), 0 2px 0 0 rgba(255, 255, 255, 0.7) inset"
      : "0 1px 1px rgba(0, 0, 0, 0.2), 0 2px 0 0 #3d3e42 inset",
  padding: theme.spacing(0, 0.5),
  borderRadius: 4,
}));

const SearchButton = styled(Button)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? alpha(theme.palette.primary.main, 0.08)
      : alpha(theme.palette.background.paper, 0.8),
  color: theme.palette.text.secondary,
  border: "none",
  borderRadius: "28px",
  minWidth: "400px",
  maxWidth: "720px",
  height: "48px",
  justifyContent: "flex-start",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  textTransform: "none",
  fontWeight: 400,
  fontSize: "16px",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? alpha(theme.palette.primary.main, 0.12)
        : alpha(theme.palette.background.paper, 1),
    border: "none",
  },
  "& .MuiButton-startIcon": {
    marginRight: theme.spacing(1.5),
    color: theme.palette.text.secondary,
  },
}));

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();
  useHotkeys(
    "/",
    () => {
      dispatch(setSearchPopup(true));
    },
    { preventDefault: true },
  );

  if (isMobile) {
    return (
      <IconButton onClick={() => dispatch(setSearchPopup(true))}>
        <Search />
      </IconButton>
    );
  }

  return (
    <SearchButton onClick={() => dispatch(setSearchPopup(true))} variant={"text"} startIcon={<Search />}>
      {t("navbar.searchInDrive")}
    </SearchButton>
  );
};

export default SearchBar;
