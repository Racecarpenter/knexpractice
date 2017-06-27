exports.up = function(knex, Promise) {
  return knex.schema.createTable('booze_types', function(table) {
    table.increments();
    table.string('type');
    table.integer('alcohol_percentage');
    table.string('country');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('booze_types');
};
