import { Badge, Box, IconButton, Stack, styled, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { FileResponse } from "../../../api/explorer.ts";
import { clearSelected, ContextMenuTypes } from "../../../redux/fileManagerSlice.ts";
import { useAppDispatch } from "../../../redux/hooks.ts";
import { downloadFiles } from "../../../redux/thunks/download.ts";
import {
  deleteFile,
  dialogBasedMoveCopy,
  openFileContextMenu,
  openShareDialog,
  renameFile,
} from "../../../redux/thunks/file.ts";
import { openViewers } from "../../../redux/thunks/viewer.ts";
import useActionDisplayOpt from "../../FileManager/ContextMenu/useActionDisplayOpt.ts";
import { FileManagerIndex } from "../../FileManager/FileManager.tsx";
import CopyOutlined from "../../Icons/CopyOutlined.tsx";
import DeleteOutlined from "../../Icons/DeleteOutlined.tsx";
import Dismiss from "../../Icons/Dismiss.tsx";
import Download from "../../Icons/Download.tsx";
import FolderArrowRightOutlined from "../../Icons/FolderArrowRightOutlined.tsx";
import MoreHorizontal from "../../Icons/MoreHorizontal.tsx";
import Open from "../../Icons/Open.tsx";
import RenameOutlined from "../../Icons/RenameOutlined.tsx";
import ShareOutlined from "../../Icons/ShareOutlined.tsx";

export interface FileSelectedActionsProps {
  targets: FileResponse[];
}

const ActionIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.08)",
  },
}));

const SelectedCountBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "4px 12px",
  fontSize: "14px",
  fontWeight: 500,
  color: theme.palette.text.primary,
  whiteSpace: "nowrap",
}));

const FileSelectedActions = forwardRef(({ targets }: FileSelectedActionsProps, ref: React.Ref<HTMLElement>) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();
  const displayOpt = useActionDisplayOpt(targets, ContextMenuTypes.file);

  if (isMobile) {
    return (
      <Stack direction={"row"} spacing={1} sx={{ height: "100%", alignItems: "center" }}>
        <IconButton
          onClick={() =>
            dispatch(
              clearSelected({
                index: FileManagerIndex.main,
                value: undefined,
              }),
            )
          }
        >
          <Badge badgeContent={targets.length} color={"primary"}>
            <Dismiss />
          </Badge>
        </IconButton>
        <IconButton onClick={(e) => dispatch(openFileContextMenu(FileManagerIndex.main, targets[0], false, e))}>
          <MoreHorizontal />
        </IconButton>
      </Stack>
    );
  }

  return (
    <Box ref={ref} sx={{ height: "100%" }}>
      <Stack direction={"row"} spacing={0.5} sx={{ height: "100%", alignItems: "center" }}>
        <ActionIconButton
          size="small"
          onClick={() =>
            dispatch(
              clearSelected({
                index: FileManagerIndex.main,
                value: undefined,
              }),
            )
          }
        >
          <Dismiss fontSize={"small"} />
        </ActionIconButton>
        <SelectedCountBox>
          {t("application:navbar.objectsSelected", {
            num: targets.length,
          })}
        </SelectedCountBox>
        {!isTablet && (
          <Stack direction="row" spacing={0.5}>
            {displayOpt.showShare && (
              <Tooltip title={t("application:fileManager.share")}>
                <ActionIconButton size="small" onClick={() => dispatch(openShareDialog(0, targets[0]))}>
                  <ShareOutlined fontSize={"small"} />
                </ActionIconButton>
              </Tooltip>
            )}
            {displayOpt.showDownload && (
              <Tooltip title={t("application:fileManager.download")}>
                <ActionIconButton size="small" onClick={() => dispatch(downloadFiles(0, targets))}>
                  <Download fontSize={"small"} />
                </ActionIconButton>
              </Tooltip>
            )}
            {displayOpt.showMove && (
              <Tooltip title={t("application:fileManager.move")}>
                <ActionIconButton size="small" onClick={() => dispatch(dialogBasedMoveCopy(0, targets, false))}>
                  <FolderArrowRightOutlined fontSize={"small"} />
                </ActionIconButton>
              </Tooltip>
            )}
            {displayOpt.showDelete && (
              <Tooltip title={t("application:fileManager.delete")}>
                <ActionIconButton size="small" onClick={() => dispatch(deleteFile(0, targets))}>
                  <DeleteOutlined fontSize="small" />
                </ActionIconButton>
              </Tooltip>
            )}
          </Stack>
        )}
        <ActionIconButton
          size="small"
          onClick={(e) => dispatch(openFileContextMenu(FileManagerIndex.main, targets[0], false, e))}
        >
          <MoreHorizontal fontSize={"small"} />
        </ActionIconButton>
      </Stack>
    </Box>
  );
});

export default FileSelectedActions;
