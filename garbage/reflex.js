const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../src/db.js');
const { loadPermissionsQuery, userQuery } = require('../src/query.js');

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Function to verify permissions
function hasAccess(modulo, clase, metodo, perfilId, permissionsMap) {
  const key = `${modulo}_${clase}_${metodo}_${perfilId}`;
  return permissionsMap.get(key) || false;
}

// Function to load permissions into a map
async function loadPermissions() {
  const permissionsMap = new Map();

  try {
    const res = await pool.query(loadPermissionsQuery);
    res.rows.forEach(row => {
      const key = `${row.des_modulo}_${row.des_clase}_${row.des_metodo}_${row.id_perfil}`;
      permissionsMap.set(key, true);
    });
  } catch (err) {
    console.error('Error loading permissions:', err);
  }

  return permissionsMap;
}

// Endpoint for authentication
app.post('/login', async (req, res) => {
  const { correo_per, password_usu } = req.body;

  try {
    const userRes = await pool.query(userQuery, [correo_per, password_usu]);
    if (userRes.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const usuario = userRes.rows[0];
    const perfilId = usuario.id_per; // Assuming 'id_per' represents the user profile ID

    // Load permissions into the map
    const permissionsMap = await loadPermissions();

    // Build user permissions object
    const userPermissions = {};
    Array.from(permissionsMap.keys())
      .filter(key => key.endsWith(`_${perfilId}`))
      .forEach(key => {
        userPermissions[key] = permissionsMap.get(key);
      });

    res.json({ success: true, permissions: userPermissions });
  } catch (err) {
    console.error('Error during authentication:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
