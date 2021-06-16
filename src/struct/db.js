async function connect(){
  const mysql = require("mysql2/promise");

  // Use da seguinte maneira: mysql://usuario:senha@servidor:porta/banco
  const connection = await mysql.createConnection("mysql://jhonn:jhonny@localhost:3306/jhonn");

  global.connection = connection;
  return connection;
};

async function getPrefix(guild){
    const conn = await connect();

    const sql = `select prefixo from guilds where id="${guild.id}";`
    const [rows] = await conn.query(sql);

    return rows;
}

async function insertGuild(guild){
    const conn = await connect();
    const sql = 'INSERT INTO guilds(id,prefixo) VALUES (?,?);';
    const values = [guild.id, guild.prefixo];
    return await conn.query(sql, values);
}

async function changePrefix(guild){
    const conn = await connect();
    const sql = `UPDATE guilds SET prefixo="${guild.prefixo}" WHERE id="${guild.id}";`;
    return await conn.query(sql);
}

async function deleteGuild(guild) {
  const conn = await connect();
  const sql = `DELETE FROM guilds WHERE id=${guild.id};`;
  return await conn.query(sql);
}

module.exports = {connect, getPrefix, insertGuild, changePrefix, deleteGuild};
