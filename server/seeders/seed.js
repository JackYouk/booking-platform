const db = require('../config/connection');
const { Profile, Agent } = require('../models');

db.once('open', async () => {
  try {
    await Profile.deleteMany({});
    await Agent.deleteMany({});


    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
