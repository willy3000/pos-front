import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  Collapse,
  Chip,
  Avatar,
  Button,
  ButtonGroup,
  Badge,
  TablePagination,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Delete } from "@mui/icons-material";
import { projectsApi } from "@/api/Projects";
import { toast } from "react-toastify";
import { fetchProjects } from "@/slices/projects";
import EastIcon from "@mui/icons-material/East";
import NextLink from "next/link";
import { TransitionGroup } from "react-transition-group";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { East } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { getInitials } from "@/utils/constants";
import Cart from "./cart";
import { addToCart } from "@/slices/cart";
import { Clear } from "@mui/icons-material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addQuantity, subtractQuantity, removeFromCart } from "@/slices/cart";
import { Cancel, CheckCircle } from "@mui/icons-material";

const applyPagination = (projects, page, rowsPerPage) =>
  projects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

export default function ProjectList(props) {
  const { projects, items, page, setPage } = props;
  const { user } = useSelector(({ user }) => user.user);
  const [images, setImages] = useState([]);
  const [sale, setSale] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const hot = () => {};

  const itemIds = items.map((item) => {
    return item.id;
  });

  let prevImage = null;

  const dispatch = useDispatch();
  const router = useRouter();

  const getCurrentRoute = () => {
    return router.pathname;
  };

  const handleDelete = async (projectId) => {
    const data = await projectsApi.deleteProject(user.userId, projectId);
    dispatch(fetchProjects(user.userId));
    toast.success(data);
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  const generateRandomProjectImage = () => {
    while (true) {
      const randomNum = Math.floor(Math.random() * (7 - 0 + 1));
      if (randomNum === prevImage) {
        console.log("continued");
        continue;
      } else {
        console.log("broken");
        prevImage = randomNum;
        return randomNum;
      }
    }
  };

  const generateProjectImageList = () => {
    const imageList = [];
    for (let i = 0; i < projects.length; i++) {
      imageList.push(generateRandomProjectImage());
    }
    console.log("imageList", imageList);
    setImages([...imageList]);
  };

  const projectStatus = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "3px",
          padding: "10px",
          width: "100%",
        }}
      >
        <QueryBuilderIcon fontSize="small"></QueryBuilderIcon>
        <Typography variant="subtitle2" fontSize={"small"}>
          In Progress
        </Typography>
      </Box>
    );
  };

  console.log("items", items);

  const isSelected = (item) => {
    console.log("single item", item);
    if (itemIds.includes(item.id)) {
      return true;
    }
    return false;
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const addItemQuantity = (item) => {
    dispatch(addQuantity(item));
  };

  const subtractItemQuantity = (item) => {
    dispatch(subtractQuantity(item));
  };

  const getItemQuantity = (id) => {
    const item = items.find((cartItem) => cartItem.id === id);
    return item.quantity;
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(0);
  };

  const handleChangePage = (e, value) => {
    setPage(Number(value));
  };

  const paginatedProjects = applyPagination(projects, page, rowsPerPage);

  useEffect(() => {
    generateProjectImageList();
  }, [projects]);

  return (
    <>
      <Grid container>
        {paginatedProjects.map((project, index) => {
          const selected = isSelected(project);
          // const imageUrl = URL.createObjectURL(project?.imageFile)
          // const blob = new Blob([project?.imageFile.buffer.toString()], {
          //   type: project?.imageFile.mimetype,
          // });

          const bufferData = project?.imageFile?.buffer;
          const base64String = bufferData
            ? bufferData.toString("base64")
            : null;

          console.log(base64String);

          // const url = URL.createObjectURL(blob);
          // console.log("back url", url);
          // console.log(project?.imageFile.buffer);

          return (
            <Grid item xs={12} sm={12} md={4} lg={3} key={project.id}>
              <Paper
                elevation={24}
                key={project?.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "1ch",
                  alignItems: "center",
                  margin: "15px",
                }}
              >
                {/* <img
                  src={`/project-images/project-image-${images[index]}.jpg`}
                  alt=""
                  width="100%"
                  style={{
                    borderTopLeftRadius: "1ch",
                    borderTopRightRadius: "1ch",
                  }}
                  height={100}
                /> */}

                <Box
                  sx={{
                    padding: "10px",
                    height: 150,
                    width: "100%",
                    fontSize: "50px",
                  }}
                >
                  <Avatar
                    variant="rounded"
                    sx={{ height: 150, width: "100%", fontSize: "50px" }}
                  >
                    {!project.imageFile ? (
                      getInitials(project?.name)
                    ) : (
                      <img
                        src={`data:image/jpeg;base64, ${base64String}`}
                        alt="Red Dot"
                        width={"100%"}
                      />
                    )}
                  </Avatar>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    padding: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight={"bold"}
                    fontSize={"17px"}
                  >
                    {project?.name}
                  </Typography>
                  <Typography variant="subtitle2">{`Kes. ${project?.price}.00`}</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    width: "100%",
                    paddingX: "10px",
                  }}
                >
                  <Chip label={`${project?.quantity} in stock`}></Chip>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    justifyContent: "space-between",
                  }}
                >
                  {selected ? (
                    // <Button
                    //   variant="contained"
                    //   color="secondary"
                    //   fullWidth
                    //   endIcon={
                    //     <IconButton
                    //       size="small"
                    //       onClick={() => handleRemoveFromCart(project)}
                    //     >
                    //       {" "}
                    //       <Clear fontSize="small"></Clear>{" "}
                    //     </IconButton>
                    //   }
                    //   end
                    // >
                    //   Selected
                    // </Button>
                    <Badge
                      sx={{
                        width: "100%",
                      }}
                      badgeContent={
                        <IconButton
                          onClick={() => handleRemoveFromCart(project)}
                        >
                          {" "}
                          <Cancel />{" "}
                        </IconButton>
                      }
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          justifyContent: "space-between",
                          paddingX: "15px",
                          paddingY: "0px",
                          border: "solid 1px #FFCA55",
                          borderRadius: "1ch",
                          backgroundColor: "#FFCA55",
                        }}
                      >
                        <IconButton
                          onClick={() => subtractItemQuantity(project)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography variant="subtitle2" fontWeight={"bold"}>
                          {getItemQuantity(project.id)}
                        </Typography>
                        <IconButton onClick={() => addItemQuantity(project)}>
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Badge>
                  ) : (
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => handleAddToCart(project)}
                    >
                      Add to Sale
                    </Button>
                  )}
                </Box>

                {/* <NextLink href={`/dashboard/projects/${project?.id}`}>
                  <IconButton>
                    <EastIcon></EastIcon>
                  </IconButton>
                </NextLink> */}
                {/* <IconButton onClick={() => handleDelete(project.id)}>
                  <Delete></Delete>
                </IconButton> */}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <TablePagination
        rowsPerPageOptions={[8, 16, 32]}
        component="div"
        count={projects.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
