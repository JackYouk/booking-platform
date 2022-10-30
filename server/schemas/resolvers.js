const { AuthenticationError } = require('apollo-server-express');
const { Profile, Agent, Tag } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },
    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    agents: async () => {
      return Agent.find();
    },
    tags: async () => {
      return Tag.find();
    },
  },

  Mutation: {
    addProfile: async (parent, { username, email, password }) => {
      const profile = await Profile.create({ username, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return { token, profile };
    },
    addAgent: async (parent, {name, bio, expertIn}, context) => {
      if (context.user) {
        const createdAgent = await Agent.create({
          name,
          bio,
          expertIn,
        });
        // if(!expertIn){
        //   return createdAgent;
        // }
        // expertIn.forEach( async (tagId) => {
        //   const tag = await Tag.findOne({_id: tagId})
        // });
        // const taggedAgent = await Agent.updateOne(
        //   {_id: createdAgent._id},
        //   {$push: expert}
        // );

        return createdAgent;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    createTag: async (parent, {type}, context) => {
      if(context.user) {
        const tag = await Tag.create({
          type
        });

        return tag;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
