const { AuthenticationError } = require('apollo-server-express');
const { Profile, Agent, Tag } = require('../models');
const Review = require('../models/Review');
const Credential = require('../models/Credential');
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
      const agent = await Agent.findOne({ _id: agentId });
      console.log(agent);
      const populatedAgent = await (await agent.populate('reviews')).populate('credentials');
      return populatedAgent;
    },
    filteredAgents: async (parent, { tagIds }) => {
      let filteredAgents = [];
      const allAgents = await Agent.find();

      const checkDupe = (checkId) => {
        let isDupe = false;
        filteredAgents.forEach(filteredAgent => {
          if(filteredAgent._conditions._id.toString() === checkId.toString()){
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
    },
    addedCredentials: async (parent, {credentialIds}) => {
      const addedCredentials = await Credential.find({
        _id: {$in: credentialIds}
      });
      return addedCredentials;
    },
    regexAgents: async(parent, {key}) => {
      // query agents by key String using mongodb regex method
      const regexAgents = await Agent.find({
        $or: [
          {"name": {$regex: key, $options: "i"}}, 
          {"industries": {$regex: key, $options: "i"}}, 
          {"bio": {$regex: key, $options: "i"}},
          {"expertIn": {$elemMatch: {"type": {$regex: key, $options: "i"}}}},
        ]
      });
      if(regexAgents.length < 1){
        const allAgents = await Agent.find();
        return allAgents;
      }
      return regexAgents;
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
    addAgent: async (parent, { name, industries, bio, acheivements, credentials, instagram, twitter, linkedin, rating, expertIn, imgPath, packages }, context) => {
      if (context.user) {
        const createdAgent = await Agent.create({
          name, 
          industries, 
          bio, 
          acheivements,
          instagram, 
          twitter, 
          linkedin, 
          rating, 
          expertIn, 
          imgPath,
          credentials,
          packages
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
    editAgent: async (parent, {_id, name, industries, bio, acheivements, instagram, twitter, linkedin, rating, expertIn, imgPath}, context) => {
      if(context.user){
        const agent = await Agent.updateOne({_id}, {$set: {name, industries, bio, acheivements, instagram, twitter, linkedin, rating, expertIn, imgPath}});
        return agent;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    editTag: async (parent, {_id, type, imgPath}, context) => {
      if(context.user){
        const tag = await Tag.updateOne({_id}, {$set: {type, imgPath}});
        return tag;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addReview: async (parent, {agentId, username, review, rating}, context) => {
      const newReview = await Review.create({
        username,
        review,
        rating
      });
      console.log(newReview, 167);
      const agent = await Agent.findOne({_id: agentId});
      const reviews = agent.reviews;
      reviews.push(newReview._id.toString());
      await Agent.updateOne({_id: agentId}, {$set: {reviews}});
      return newReview;
    },
    addCredential: async (parent, {icon, title, description, link}, context) => {
      const newCredential = await Credential.create({
        icon, 
        title, 
        description, 
        link,
      });
      return newCredential;
    },
  },
  
};

module.exports = resolvers;
