import { Box, ButtonBase, darken, lighten, styled } from "@mui/material";
import * as React from "react";
import { NoWrapTypography } from "../../Common/StyledComponents.tsx";

const StyledButtonBase = styled(ButtonBase)<{
  active?: boolean;
}>(({ theme, active }) => ({
  borderRadius: "20px",
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  width: "100%",
  backgroundColor: active
    ? `${
        theme.palette.mode == "light"
          ? lighten(theme.palette.primary.main, 0.75)
          : darken(theme.palette.primary.main, 0.6)
      }!important`
    : "initial",
  color: active
    ? theme.palette.mode == "light"
      ? darken(theme.palette.primary.main, 0.2)
      : lighten(theme.palette.primary.main, 0.3)
    : theme.palette.text.primary,
  transition:
    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
}));

export interface SideNavItemBaseProps {
  active?: boolean;
  [key: string]: any;
}
export const SideNavItemBase = React.forwardRef(
  ({ active, ...rest }: SideNavItemBaseProps, ref: React.Ref<HTMLElement>) => {
    return <StyledButtonBase active={active} {...rest} ref={ref} />;
  },
);

const StyledSideNavItem = styled(SideNavItemBase)<{ level?: number }>(({ theme, level }) => ({
  "&:hover": {
    backgroundColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.08)",
  },
  padding: "4px 12px",
  paddingLeft: `${16 + (level ?? 0) * 16}px`,
  height: "32px",
  display: "flex",
  alignItems: "center",
  marginBottom: "2px",
}));

export interface SideNavItemProps extends SideNavItemBaseProps {
  icon?: React.ReactNode;
  label?: string | React.ReactNode;
  level?: number;
  [key: string]: any;
}

const SideNavItem = React.forwardRef(
  ({ icon, label, level, sx, ...rest }: SideNavItemProps, ref: React.Ref<HTMLElement>) => {
    return (
      <StyledSideNavItem
        level={level}
        sx={{
          ...sx,
        }}
        {...rest}
        ref={ref}
      >
        <Box
          sx={{
            width: 20,
            mr: "14px",
          }}
        >
          {icon}
        </Box>
        <NoWrapTypography variant={"body2"}>{label}</NoWrapTypography>
      </StyledSideNavItem>
    );
  },
);

export default SideNavItem;
