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
      const agents = await Agent.find();
      return agents;
    },
    tags: async () => {
      const tags = await Tag.find();
      return tags;
    },
    agent: async (parent, { agentId }) => {
      return Agent.findOne({ _id: agentId });
    },
    filteredAgents: async (parent, { tagIds }) => {
      let filteredAgents = [];
      const allAgents = await Agent.find();

      const checkDupe = (checkId) => {
        filteredAgents.forEach(filteredAgent => {
          if(filteredAgent._id === checkId){
            return true;
          }
        });
        return false;
      }

      const checkMatch = (tag) => {
        allAgents.forEach(agent => {
          if (agent.expertIn.length > 0) {
            agent.expertIn.forEach(expertTagId => {
              if(expertTagId.toString() === tag){
                const filteredAgent = Agent.findOne({_id: agent._id});
                const isDupe = checkDupe(filteredAgent._id);
                if(!isDupe){
                  filteredAgents.push(filteredAgent);
                }
                return;
              }
            })
          }
        });
      }

      if (tagIds.length > 0) {
        tagIds.forEach(tagId => {
          checkMatch(tagId);
        });
      }

      return filteredAgents;
    }
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
    addAgent: async (parent, { name, bio, expertIn }, context) => {
      if (context.user) {
        const createdAgent = await Agent.create({
          name,
          bio,
          expertIn,
        });

        return createdAgent;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    createTag: async (parent, { type }, context) => {
      if (context.user) {
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
