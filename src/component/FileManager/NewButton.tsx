import Add from "../Icons/Add.tsx";
import { Button, IconButton, styled, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../redux/hooks.ts";
import { openNewContextMenu } from "../../redux/thunks/filemanager.ts";
import { FileManagerIndex } from "./FileManager.tsx";

const GoogleDriveNewButton = styled(Button)(({ theme }) => ({
  borderRadius: "16px",
  padding: "6px 16px 6px 12px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: "0 1px 3px 0 rgba(60,64,67,0.302), 0 4px 8px 3px rgba(60,64,67,0.149)",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: theme.palette.mode === "light" ? "#f6f9fe" : theme.palette.grey[800],
    boxShadow: "0 1px 3px 0 rgba(60,64,67,0.302), 0 4px 8px 3px rgba(60,64,67,0.149)",
  },
  "& .MuiButton-startIcon": {
    marginRight: "12px",
  },
}));

const NewButton = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    return (
      <IconButton onClick={(e) => dispatch(openNewContextMenu(FileManagerIndex.main, e))}>
        <Add />
      </IconButton>
    );
  }

  return (
    <GoogleDriveNewButton
      variant={"text"}
      onClick={(e) => dispatch(openNewContextMenu(FileManagerIndex.main, e))}
      startIcon={
        <Add sx={{ color: theme.palette.mode === "light" ? theme.palette.text.primary : theme.palette.primary.main }} />
      }
    >
      {t("fileManager.new")}
    </GoogleDriveNewButton>
  );
};

export default NewButton;
