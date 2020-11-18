
exports.up = function(knex) {
  return knex.schema.createTable('category',tbl=> {
      tbl.increments()
      tbl.string('name')
        .notNullable()
      tbl.timestamps(true,true)
  })
  .createTable('product', tbl=>{
      tbl.increments()
      tbl.string('name')
        .notNullable()
        .index()
      tbl.integer('price')
        .unsigned()
      tbl.integer('quantity')
        .unsigned()
      tbl.timestamps(true,true)
      //fr key to category
      tbl.integer('category_id')
        .unsigned()
        .references('id')
        .inTable('category')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExits('category').dropTableIfExits('product')
};
