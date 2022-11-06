const db = require('../config/connection');
const { Profile, Team, Agent } = require('../models');
const profiles = require('./profiles');

db.once('open', async () => {
  try {
    await Profile.deleteMany({});
    await Agent.deleteMany({});
    await Profile.create(profiles);


    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
