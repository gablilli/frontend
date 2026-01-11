import { Box, IconButton, Skeleton, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FileResponse } from "../../../api/explorer.ts";
import { closeShareReadme, closeSidebar } from "../../../redux/globalStateSlice.ts";
import { useAppDispatch } from "../../../redux/hooks.ts";
import Dismiss from "../../Icons/Dismiss.tsx";
import FileIcon from "../Explorer/FileIcon.tsx";

export interface HeaderProps {
  target: FileResponse | undefined | null;
  variant?: "readme";
  tabValue?: number;
  onTabChange?: (value: number) => void;
}
const Header = ({ target, variant, tabValue = 0, onTabChange }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", p: 2, pb: 1 }}>
        {target !== null && <FileIcon sx={{ p: 0 }} loading={target == undefined} file={target} type={target?.type} />}
        {target !== null && (
          <Box sx={{ flexGrow: 1, ml: 1.5, minWidth: 0 }}>
            <Typography
              color="textPrimary"
              sx={{
                wordBreak: "break-word",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
              variant={"subtitle1"}
              fontWeight={500}
            >
              {target && target.name}
              {!target && <Skeleton variant={"text"} width={75} />}
            </Typography>
          </Box>
        )}
        <IconButton
          onClick={() => {
            dispatch(variant == "readme" ? closeShareReadme() : closeSidebar());
          }}
          sx={{
            ml: 1,
            placeSelf: "flex-start",
          }}
          size={"small"}
        >
          <Dismiss fontSize={"small"} />
        </IconButton>
      </Box>
      {target !== null && (
        <Tabs
          value={tabValue}
          onChange={(_, v) => onTabChange?.(v)}
          sx={{
            minHeight: 40,
            "& .MuiTab-root": {
              minHeight: 40,
              textTransform: "none",
              fontWeight: 500,
              fontSize: "14px",
            },
          }}
        >
          <Tab label={t("fileManager.details")} />
          <Tab label={t("fileManager.activity")} />
        </Tabs>
      )}
    </Box>
  );
};

export default Header;
