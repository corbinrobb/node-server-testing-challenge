
exports.up = function(knex) {
  return knex.schema.createTable('data', tbl => {
    tbl.increments();
    tbl.string('name');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('data');
};
