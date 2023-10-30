import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Menu,
  MenuItem,
  Select,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  FormControl,
  Drawer,
  Container,
  Button,
  Divider,
  FormHelperText,
} from "@mui/material";
import React from "react";
import { useContext } from "react";
import SharedContext from "./SharedContext";

const drawerWidth = 240;
const Root = () => {
  const { symbolList, setBaseCurrency, baseCurrency } =
    useContext(SharedContext);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="sticky"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            justifyContent: "center",
          }}
        >
          <Container
            maxWidth="s"
            sx={{ justifyContent: "center", maxHeight: "s" }}
          >
            <Toolbar disableGutters>
              <AccountBalanceWalletOutlinedIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              />

              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Ana Sayfa
              </Typography>
              <Divider />
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Divider orientation="vertical" flexItem />
                {symbolList.map((page, index) =>
                  page.code === baseCurrency ? null : (
                    <>
                      <NavLink
                        to={`/detailview/${page.code}`}
                        style={{ textDecoration: "none", color: "black" }}
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        <Button
                          key={index}
                          sx={{
                            verticalAlign: "center",
                            my: 2,
                            color: "white",
                            justifyContent: "center",
                            alignItems: "center",

                            display: "flex",
                            fontSize: 12,
                          }}
                        >
                          {page.name}
                        </Button>
                      </NavLink>
                      <Divider orientation="vertical" flexItem />
                    </>
                  )
                )}
              </Box>
              <FormControl variant="standard" sx={{ width: 150 }}>
                <InputLabel sx={{ color: "white" }}>Base Currency</InputLabel>
                <Select
                  id="demo-simple-select"
                  value={baseCurrency}
                  label="Baz Kur"
                  onChange={(event) => setBaseCurrency(event.target.value)}
                >
                  {symbolList.map((kur, index) => (
                    <MenuItem key={index} value={kur.code}>
                      {kur.code}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Default:TRY</FormHelperText>
              </FormControl>
            </Toolbar>
          </Container>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {symbolList.map((rate, index) =>
                rate.code !== baseCurrency ? (
                  <Box>
                    <NavLink
                      key={index * 25}
                      to={`/detailview/${rate.code}`}
                      style={{ textDecoration: "none", color: "black" }}
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      <ListItem key={index} disablePadding>
                        <ListItemButton>
                          <ListItemText>{rate.name}</ListItemText>
                        </ListItemButton>
                      </ListItem>
                    </NavLink>
                    <Divider />
                  </Box>
                ) : null
              )}
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};
export default Root;
