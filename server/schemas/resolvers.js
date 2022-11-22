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
      let tags = [];
      const findTags = async () => {
        tags = await Tag.find();
        if(!tags[0].type){
          findTags();
        }
      }
      await findTags();
      return tags;
    },
    agent: async (parent, { agentId }) => {
      return Agent.findOne({ _id: agentId });
    },
    filteredAgents: async (parent, { tagIds }) => {
      let filteredAgents = [];
      const allAgents = await Agent.find();

      const checkDupe = (checkId) => {
        let isDupe = false;
        filteredAgents.forEach(filteredAgent => {
          if(filteredAgent._conditions._id.toString() === checkId.toString()){
            console.log('trueeeeeeeeeeeeeeeeee')
            isDupe = true;
          }
        });
        return isDupe;
      }

      const checkMatch = (tag) => {
        allAgents.forEach(agent => {
          if (agent.expertIn.length > 0) {
            agent.expertIn.forEach(expertTagId => {
              if(expertTagId.toString() === tag){
                const filteredAgent = Agent.findOne({_id: agent._id});
                const isDupe = checkDupe(agent._id);
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
    addAgent: async (parent, { name, bio, expertIn, imgPath }, context) => {
      if (context.user) {
        const createdAgent = await Agent.create({
          name,
          bio,
          expertIn,
          imgPath,
        });

        return createdAgent;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    createTag: async (parent, { type, imgPath }, context) => {
      if (context.user) {
        const tag = await Tag.create({
          type,
          imgPath,
        });

        return tag;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteAgent: async (parent, {agentId}, context) => {
      if(context.user){
        const agent = await Agent.deleteOne({_id: agentId});
        return agent;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteTag: async (parent, {tagId}, context) => {
      if(context.user){
        const tag = await Tag.deleteOne({_id: tagId});
        return tag;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    editAgent: async (parent, {_id, name, bio, expertIn, imgPath}, context) => {
      if(context.user){
        const agent = await Agent.updateOne({_id}, {$set: {name, bio, expertIn, imgPath}});
        return agent;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    editTag: async (parent, {_id, type, imgPath}, context) => {
      if(context.user){
        const tag = await Tag.updateOne({_id}, {$set: {type, imgPath}});
        console.log(tag);
        return tag;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
