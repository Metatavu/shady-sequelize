(() => {
  'use strict';
  
  const Sequelize = require('sequelize');
  
  module.exports = (options, imports, register) => {
    const sequelize = new Sequelize(options.database, options.username, options.password, {
      logging: false,
      host: options.host,
      dialect: options.dialect,
      pool: Object.assign({
        max: 5,
        min: 0,
        idle: 10000
      }, options.pool || {})
    });
    
    sequelize.authenticate()
      .then(() => {
        register(null, {
          'shady-sequelize': {
            sequelize: sequelize,
            Sequelize: Sequelize
          }
        });
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });

  };
})();