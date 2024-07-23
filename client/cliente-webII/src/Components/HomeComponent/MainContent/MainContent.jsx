import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  ListItem,
  ListItemText,
  Input,
  CircularProgress,
  Avatar,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import FormDialog from "../FormDialog";
import Tree3 from "../assetsHome/3.png";
import AlertDialog from "../AlertDialog";
import AddMemberDialog from "../AddMemberDialog";
import EditMemberDialog from "../EditMemberDialog";
import Editing from "../Editing/Editing";

const MainContent = ({ personId }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectDetails, setProjectDetails] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`http://localhost:3000/allproject/${personId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchProjectDetails = async (id_proyecto) => {
    console.log(id_proyecto)
    try {
      const response = await fetch(`http://localhost:3000/getactivity/${id_proyecto}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const dataAct = await response.json();
      setProjectDetails(dataAct);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [personId]);

  const handleCreateProject = async (newProjectData) => {
    try {
      const response = await fetch("http://localhost:3000/createproject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProjectData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Fetch projects after a successful project creation
      fetchProjects();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleDeleteProject = async (id_proyecto, id_miembro, id_perfil_pro) => {
    try {
      const response = await fetch(`http://localhost:3000/deleteproject/${id_proyecto}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_miembro, id_perfil_pro }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setProjects(projects.filter((project) => project.id_proyecto !== id_proyecto));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleProjectClick = async (project) => {
    setSelectedProject(project);
    await fetchProjectDetails(project.id_proyecto);
  };

  return (
    <Box sx={{ padding: 5, display: "flex", flexDirection: "column", width: "100%", overflow: "hidden" }}>
      <Box sx={{ position: "sticky", top: 0, left: 0, backgroundColor: "white", zIndex: 1, width: "100%" }}>
        <Typography variant="h2" sx={{ color: "#4dc869", fontFamily: "Roboto, sans-serif", fontSize: "4.5rem", fontWeight: "bold", textAlign: "start", marginBottom: 3, marginTop: 0, paddingTop: 2 }}>
          PROJECT
        </Typography>
        <Box sx={{ marginBottom: 15 }}>
          <Input color="success" size="lg" variant="solid" fullWidth />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <FormDialog onCreate={handleCreateProject} personId={personId} />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", padding: 2, borderRadius: 1, flexWrap: "wrap", marginTop: 3, overflow: "auto", maxHeight: "calc(100vh - 200px)" }}>
        {projects.map((project, index) => (
          <ListItem
            key={index}
            sx={{ margin: 1, backgroundColor: "#F7F7F7", borderRadius: 3, padding: 1, width: 300, height: 100, display: "flex", alignItems: "center", justifyContent: "space-around", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", position: "relative", cursor: "pointer" }}
            onClick={() => handleProjectClick(project)}
          >
            <AlertDialog
              projectId={project.id_proyecto}
              memberId={project.id_miembro}
              profileId={project.id_perfil_pro}
              onDelete={handleDeleteProject}
            />
            <Box>
              <ListItemText
                primary={project.des_proyecto}
                primaryTypographyProps={{ sx: { textAlign: "center", color: "#4dc869", fontSize: "1.5rem", fontFamily: "Roboto, sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%" } }}
              />
              <Box sx={{ background: "#4dc869", height: 25, borderRadius: 3, display: "flex" }}>
                <Typography
                  variant="h2"
                  sx={{ color: "white", fontFamily: "Roboto, sans-serif", fontSize: "1rem", position: "relative", fontWeight: "bold", textAlign: "center", alignItems: "center", margin: "auto" }}
                >
                  Ontime
                </Typography>
              </Box>
            </Box>

            <Box sx={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <CircularProgress variant="determinate" value={Math.random() * 100} sx={{ color: "#4dc869" }} size={60} />
              <Avatar src={Tree3} alt="Your Image" sx={{ width: 30, height: 30, position: "absolute" }} />
            </Box>
          </ListItem>
        ))}
      </Box>
      {selectedProject && projectDetails && (
        <Box
          sx={{ marginTop: 5, padding: 2, backgroundColor: "#fff", borderRadius: 3, boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", overflow: "auto", maxHeight: "calc(100vh - 300px)", maxWidth: "50%", marginLeft: "13%", position: "relative" }}
        >
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            {selectedProject.des_proyecto}
          </Typography>

          {selectedProject.id_perfil_pro === 1 && (
            <>
              <AddMemberDialog projectId={selectedProject.id_proyecto} />
              <EditMemberDialog projectId={selectedProject.id_proyecto} />
            </>
          )}

          <IconButton onClick={() => setSelectedProject(null)} sx={{ position: "absolute", top: 10, right: 10 }}>
            <Close />
          </IconButton>

          <Box
            sx={{ marginTop: 5, padding: 2, backgroundColor: "#fff", borderRadius: 3, boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", height: "400px", width: "3000px", overflow: "hidden", maxWidth: "100%" }}
          >
            <Editing project={selectedProject} projectDetails={projectDetails} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MainContent;
