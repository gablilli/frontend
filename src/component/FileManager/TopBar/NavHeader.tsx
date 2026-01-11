import { Box, Stack, ToggleButton, ToggleButtonGroup, styled, useMediaQuery, useTheme } from "@mui/material";
import { useContext } from "react";
import { Layouts } from "../../../redux/fileManagerSlice.ts";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks.ts";
import { setLayoutSetting } from "../../../redux/thunks/filemanager.ts";
import NavIconTransition from "../../Frame/NavBar/NavIconTransition.tsx";
import AppsList from "../../Icons/AppsList.tsx";
import AppsListOutlined from "../../Icons/AppsListOutlined.tsx";
import Grid from "../../Icons/Grid.tsx";
import GridOutlined from "../../Icons/GridOutlined.tsx";
import { RadiusFrame } from "../../Frame/RadiusFrame.tsx";
import Breadcrumb from "./Breadcrumb.tsx";
import TopActions from "./TopActions.tsx";
import TopActionsSecondary from "./TopActionsSecondary.tsx";
import { SearchIndicator } from "../Search/SearchIndicator.tsx";
import { FmIndexContext } from "../FmIndexContext.tsx";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
  borderRadius: "20px",
  padding: "2px",
  "& .MuiToggleButton-root": {
    border: "none",
    borderRadius: "18px",
    padding: "4px 8px",
    minWidth: "36px",
    "&.Mui-selected": {
      backgroundColor: theme.palette.background.paper,
      boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
      "&:hover": {
        backgroundColor: theme.palette.background.paper,
      },
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

const NavHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();
  const fmIndex = useContext(FmIndexContext);
  const layout = useAppSelector((state) => state.fileManager[fmIndex].layout);
  const isSingleFileView = useAppSelector((state) => state.fileManager[fmIndex].list?.single_file_view);

  const handleLayoutChange = (_event: React.MouseEvent<HTMLElement>, newMode: string) => {
    if (newMode) {
      dispatch(setLayoutSetting(fmIndex, newMode));
    }
  };

  return (
    <Stack
      direction={"row"}
      spacing={1}
      sx={{
        px: isMobile ? 2 : "initial",
        alignItems: "center",
      }}
    >
      <RadiusFrame
        sx={{
          flexGrow: 1,
          p: 0.5,
          overflow: "hidden",
          display: "flex",
        }}
        withBorder
      >
        <Breadcrumb />
        <SearchIndicator />
      </RadiusFrame>
      {!isMobile && !isSingleFileView && (
        <StyledToggleButtonGroup value={layout} exclusive onChange={handleLayoutChange} size="small">
          <ToggleButton value={Layouts.list}>
            <NavIconTransition
              iconProps={{ fontSize: "small" }}
              sx={{ height: "20px" }}
              fileIcon={[AppsList, AppsListOutlined]}
              active={layout === Layouts.list}
            />
          </ToggleButton>
          <ToggleButton value={Layouts.grid}>
            <NavIconTransition
              iconProps={{ fontSize: "small" }}
              sx={{ height: "20px" }}
              fileIcon={[Grid, GridOutlined]}
              active={layout === Layouts.grid}
            />
          </ToggleButton>
        </StyledToggleButtonGroup>
      )}
      {!isMobile && (
        <RadiusFrame>
          <TopActionsSecondary />
        </RadiusFrame>
      )}
      <RadiusFrame>
        <TopActions />
      </RadiusFrame>
    </Stack>
  );
};

export default NavHeader;
