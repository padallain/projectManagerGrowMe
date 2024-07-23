const insertUserProject = `
  INSERT INTO proyecto (des_proyecto, id_estado)
  VALUES ($1, 1)
  RETURNING id_proyecto;`;

const insertMember = `
  INSERT INTO miembro (id_per, id_proyecto, id_perfil_pro)
  VALUES ($1, $2, $3);`;


const removeProject = `
  DELETE FROM proyecto
  WHERE id_proyecto = $1;
`;

const removeMember = `
  DELETE FROM miembro 
  WHERE id_miembro=$1

`

const updateNamesProject = `
  UPDATE proyecto
  SET des_proyecto = $1
  WHERE id_proyecto = $2;
`;

const selectProject = `
    SELECT p.id_proyecto, p.des_proyecto, m.id_perfil_pro, m.id_miembro FROM proyecto p
  INNER JOIN miembro m on p.id_proyecto = m.id_proyecto WHERE id_per = $1
  GROUP BY p.id_proyecto, p.des_proyecto,  m.id_perfil_pro, m.id_miembro
`;

const membersProject = ` 
SELECT p.correo_per, m.id_perfil_pro FROM persona p
INNER JOIN miembro m on p.id_per=m.id_per where id_proyecto=$1
`;

const updateMember = `
UPDATE miembro SET id_perfil_pro = $1 WHERE id_proyecto=$2 AND id_per= $3
`

const deleteMember = `
DELETE FROM miembro where id_proyecto= $1 and id_per= $2
`
const viewActivity = `
SELECT 
    a.id_act,
    o.id_obj,
    o.des_obj,
    a.des_act,
    a.fechaini_act,
    a.porcentaje_act,
    pre.actividad_padre,
    a.info_act,
    a.recursos_act, 
    a.duracion_act
FROM actividad a
LEFT JOIN prelacion pre ON a.id_act = pre.actividad_hija
INNER JOIN objetivo o ON a.id_obj = o.id_obj 
INNER JOIN proyecto p ON o.id_proyecto = p.id_proyecto 
WHERE o.id_proyecto = $1;
`

const calendarAct = `
SELECT  a.fechaini_act, a.fechafinal_act, a.des_act FROM actividad a
INNER JOIN objetivo o ON a.id_obj = o.id_obj 
INNER JOIN proyecto p ON o.id_proyecto = p.id_proyecto
INNER JOIN miembro m on p.id_proyecto = m.id_proyecto where m.id_per=$1
`

const insertTask = `
INSERT INTO actividad (des_act, fechaini_act, duracion_act, porcentaje_act, id_obj)
VALUES ($1, $2, $3, $4, $5);
`;

const checkExistingObjective = `
SELECT id_obj FROM objetivo WHERE id_proyecto = $1;
`;

const insertDefaultObjective = `
INSERT INTO objetivo (des_obj, id_estado, id_proyecto)
VALUES ($1, $2, $3)
RETURNING id_obj;
`;


module.exports = {
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
};
