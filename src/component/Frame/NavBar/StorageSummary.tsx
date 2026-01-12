import { Box, LinearProgress, linearProgressClasses, Skeleton, styled, Typography } from "@mui/material";
import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks.ts";
import { updateUserCapacity } from "../../../redux/thunks/filemanager.ts";
import { sizeToString } from "../../../util";

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 2, 2, 2),
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: "auto",
}));

const BorderLinearProgress = styled(LinearProgress)<{ warning: boolean }>(({ theme, warning }) => ({
  height: 4,
  borderRadius: 2,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 2,
    backgroundColor: warning ? theme.palette.warning.main : theme.palette.primary.main,
  },
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
}));

const StorageSummary = memo(() => {
  const { t } = useTranslation("application");
  const dispatch = useAppDispatch();
  const capacity = useAppSelector((state) => state.fileManager[0].capacity);
  useEffect(() => {
    if (!capacity) {
      dispatch(updateUserCapacity(0));
      return;
    }
  }, [capacity]);
  return (
    <StyledBox>
      {capacity && (
        <BorderLinearProgress
          warning={capacity.used > capacity.total}
          variant="determinate"
          value={Math.min(100, (capacity.used / capacity.total) * 100)}
        />
      )}
      {!capacity && <Skeleton sx={{ mt: 1, height: 4 }} variant="rounded" />}
      <Typography variant={"caption"} color={"text.secondary"} sx={{ fontSize: "12px" }}>
        {capacity ? (
          `${sizeToString(capacity.used)} ${t("navbar.of")} ${sizeToString(capacity.total)} ${t("navbar.used")}`
        ) : (
          <Skeleton sx={{ width: "50%" }} variant="text" />
        )}
      </Typography>
    </StyledBox>
  );
});

export default StorageSummary;
