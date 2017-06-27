exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('booze_types').del()
    .then(function() {
      // Inserts seed entries
      return knex('booze_types').insert([{
          type: 'Scotch Whiskey',
          alcohol_percentage: 60,
          country: 'Scotland'
        },
        {
          type: 'Tequila',
          alcohol_percentage: 70,
          country: 'Mexico'
        },
        {
          type: 'Vodka',
          alcohol_percentage: 40,
          country: 'Russia'
        }
      ]);
    });
};
