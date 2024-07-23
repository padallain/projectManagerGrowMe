const pool = require("../db");
const {
  insertUserProject,
  insertMember,
  removeProject,
  updateNamesProject,
  selectProject,
  removeMember,
  membersProject,
  updateMember,
  deleteMember,
  viewActivity,
  insertTask,
  checkExistingObjective,
  insertDefaultObjective,
  calendarAct 
} = require("../projectQueries");

const { checkEmailQuery } = require("../query");

class BoProject {
  constructor() {}

  async createProject(req, res) {
    try {
      const { id_per, des_proyecto, id_perfil_pro } = req.body;

      const result = await pool.query(insertUserProject, [des_proyecto]);
      const id_proyecto = result.rows[0].id_proyecto;
      await pool.query(insertMember, [id_per, id_proyecto, id_perfil_pro]);
      res
        .status(201)
        .json({ message: "Project created successfully", id_proyecto });
    } catch (error) {
      console.error("Error creating project:", error);
      res
        .status(500)
        .json({ message: "Error creating project", error: error.message });
    }
  }

  async deleteProject(req, res) {
    try {
      const id_proyecto = req.params.id_proyecto;
      const { id_miembro, id_perfil_pro } = req.body;
      console.log(id_proyecto, id_miembro, id_perfil_pro);

      await pool.query("BEGIN"); // Inicia una transacción

      if (id_perfil_pro === 1) {
        await pool.query(removeMember, [id_miembro]);
        await pool.query(removeProject, [id_proyecto]);
      } else {
        await pool.query(removeMember, [id_miembro]);
      }

      await pool.query("COMMIT"); // Confirma la transacción

      res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
      await pool.query("ROLLBACK"); // Revertir la transacción en caso de error
      console.error(error);
      res.status(500).json({ message: "Error deleting project" });
    }
  }

  async updateProjectName(req, res) {
    try {
      const { id_pro, des_proyecto } = req.body;

      await pool.query(updateNamesProject, [des_proyecto, id_pro]);

      res.status(200).json({ message: "Project updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating project" });
    }
  }

  async getProjects(req, res) {
    try {
      const id_per = req.params.id_per;
      const result = await pool.query(selectProject, [id_per]);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res
        .status(500)
        .json({ message: "Error fetching projects", error: error.message });
    }
  }

  async addMemberProject(req, res) {
    try {
      const { correo_per, id_proyecto, id_perfil_pro } = req.body;
      console.log(correo_per);

      const result = await pool.query(checkEmailQuery, [correo_per]);
      const personId = result.rows[0].id_per; // Extract the id_per value from the result
      console.log(personId);

      await pool.query(insertMember, [personId, id_proyecto, id_perfil_pro]);
      res.status(201).json({ message: "The member is included", id_proyecto });
    } catch (error) {
      console.error("Error adding member:", error);
      res
        .status(500)
        .json({ message: "Error adding member", error: error.message });
    }
  }

  async projectMember(req, res) {
    try {
      const id_project = req.params.id_proyecto;
      console.log(id_project);
      const result = await pool.query(membersProject, [id_project]);
      console.log(result);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error fetching members:", error);
      res
        .status(500)
        .json({ message: "Error fetching member", error: error.message });
    }
  }

  async editProfileMember(req, res) {
    try {
      const { id_perfil_pro, id_proyecto, correo_per } = req.body;
      console.log(id_perfil_pro, id_proyecto, correo_per);
      const result = await pool.query(checkEmailQuery, [correo_per]);
      const personId = result.rows[0].id_per; // Extract the id_per value from the result
      console.log(personId);

      await pool.query(updateMember, [id_perfil_pro, id_proyecto, personId]);
      res.status(201).json({ message: "The profile was changed", id_proyecto });
    } catch (error) {
      console.error("Error editting member:", error);
      res
        .status(500)
        .json({ message: "Error adding member", error: error.message });
    }
  }

  async deleteMember(req, res) {
    const { id_proyecto } = req.params;
    const { correo_per } = req.body;
    const result = await pool.query(checkEmailQuery, [correo_per]);
    const personId = result.rows[0].id_per;
  
    try {
      await pool.query("BEGIN");
      await pool.query(deleteMember, [id_proyecto, personId]);
      await pool.query("COMMIT");
  
      res.status(200).json({ message: "Member deleted successfully" });
    } catch (error) {
      await pool.query("ROLLBACK");
      console.error(error);
      res.status(500).json({ message: "Error deleting member" });
    }
  }

  async memberActivity(req, res) {
    try {
      const id_project = req.params.id_proyecto;
      console.log(id_project);
      const result = await pool.query(viewActivity, [id_project]);
      console.log(result)
      res.status(200).json( result.rows);
    } catch (error) {
      console.error("Error fetching activity:", error);
      res
        .status(500)
        .json({ message: "Error fetching activity ", error: error.message });
    }
  }

  async addTask(req, res) {
    try {
      const { des_act, fechaini_act,  duracion_act, porcentaje_act, id_obj} = req.body;
      await pool.query(insertTask, [des_act, fechaini_act,  duracion_act, porcentaje_act, id_obj]);
      res.status(201).json({ message: "The task is included", des_act });
    } catch (error) {
      console.error("Error adding task:", error);
      res
        .status(500)
        .json({ message: "Error adding task", error: error.message });
    }
  }
  async  addTask(req, res) {
    try {
      const { des_act, fechaini_act, duracion_act, porcentaje_act, id_proyecto } = req.body;
      let { id_obj } = req.body;
  
      // Check if an objective already exists for the project
      const existingObjectiveResult = await pool.query(checkExistingObjective, [id_proyecto]);
      
      if (existingObjectiveResult.rows.length === 0) {
        // No existing objective, create a default objective
        const defaultObjectiveResult = await pool.query(insertDefaultObjective, ['start proyecto', 1, id_proyecto]);
        id_obj = defaultObjectiveResult.rows[0].id_obj; // Get the new objective ID
      } else {
        // Use the existing objective ID
        id_obj = existingObjectiveResult.rows[0].id_obj;
      }
  
      // Insert the task with the obtained objective ID
      await pool.query(insertTask, [des_act, fechaini_act, duracion_act, porcentaje_act, id_obj]);
      
      res.status(201).json({ message: "The task is included", des_act });
    } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).json({ message: "Error adding task", error: error.message });
    }
  }


  async calendarActivity(req, res) {
    try {
      const id_per= req.params.id_per;
      console.log(id_per);
      const result = await pool.query(calendarAct, [id_per]);
      console.log(result)
      res.status(200).json( result.rows);
    } catch (error) {
      console.error("Error fetching activity:", error);
      res
        .status(500)
        .json({ message: "Error fetching activity ", error: error.message });
    }
  }

}






module.exports = BoProject;
