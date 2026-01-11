import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FileResponse } from "../../../api/explorer.ts";
import useActionDisplayOpt from "../ContextMenu/useActionDisplayOpt.ts";
import Details from "./Details.tsx";
import Header from "./Header.tsx";

export interface SidebarContentProps {
  target: FileResponse | undefined | null;
  inPhotoViewer?: boolean;
  setTarget: (target: FileResponse | undefined | null) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ px: 2, py: 1 }}>{children}</Box>}
    </div>
  );
}

const SidebarContent = ({ target, inPhotoViewer, setTarget }: SidebarContentProps) => {
  const { t } = useTranslation();
  const targetDisplayOptions = useActionDisplayOpt(target ? [target] : []);
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header target={target} tabValue={tabValue} onTabChange={setTabValue} />
      {target != null && (
        <>
          <Box
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              borderBottom: 1,
              borderColor: "divider",
            }}
          ></Box>
          <Box sx={{ overflow: "auto", flexGrow: 1 }}>
            <TabPanel value={tabValue} index={0}>
              <Details
                inPhotoViewer={inPhotoViewer}
                target={target}
                setTarget={setTarget}
                targetDisplayOptions={targetDisplayOptions}
              />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ py: 4, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  {t("fileManager.noActivityYet")}
                </Typography>
              </Box>
            </TabPanel>
          </Box>
        </>
      )}
      {target == null && (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {t("fileManager.selectItemToViewDetails")}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SidebarContent;
