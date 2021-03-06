import { Group, Marknote, Quicknote } from "note-types";
import { ObjectId } from "mongodb";

const mongoCollections = require("../config/mongoCollections");
const groups = mongoCollections.groups;

const createGroup = async (title: string, color: string) => {
  if (color.trim().length === 0) throw "createGroup: must provide a color";
  const newGroup: Group = {
    type: "group",
    _id: new ObjectId(),
    title: title,
    color: color,
    quicknotes: [],
    marknotes: [],
    lastModified: Date.now(),
    favorited: false,
  };

  const groupsCollection = await groups();

  const insertInfo = await groupsCollection.insertOne(newGroup);
  if (insertInfo.insertedCount === 0)
    throw "createGroup: Could not create new group";
  const id = insertInfo.insertId.toString();
  return newGroup;
};

const getAllGroups = async () => {
  const groupsCollection = await groups();
  const groupsList = await groupsCollection.find({}).toArray();

  if (groupsList.length === 0) return [];
  for (const group of groupsList) {
    group._id = group._id.toString();
  }
  return groupsList;
};

const getGroupById = async (id: string) => {
  const parsed_id = new ObjectId(id.trim());
  const groupsCollection = await groups();
  const group = await groupsCollection.findOne({ _id: parsed_id });

  if (group === null) {
    throw `getGroupById: No group found with id '${id}'`;
  }
  group._id = group._id.toString();

  return group;
};

const updateGroupById = async (id: string, updatedGroup: Group) => {
  const groupsCollection = await groups();
  const parsed_id = new ObjectId(id.trim());
  const updateInfo = await groupsCollection.updateOne(
    { _id: parsed_id },
    { $set: updatedGroup }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw "updateGroupById: Failed to update group";
  return await getGroupById(id.trim());
};

const deleteGroupById = async (id: string) => {
  const groupsCollection = await groups();
  const parsed_id = new ObjectId(id.trim());
  const deleteInfo = await groupsCollection.deleteOne({ _id: parsed_id });
  if (deleteInfo.deletedCount === 0)
    throw "deleteGroupById: Failed to delete group";
  return true;
};

const addNoteToGroup = async (id: string, note: Quicknote | Marknote) => {
  const groupsCollection = await groups();
  const parsed_id = new ObjectId(id.trim());

  const updateInfo =
    note.type === "quicknote"
      ? await groupsCollection.updateOne(
          { _id: parsed_id },
          { $addToSet: { quicknotes: note } }
        )
      : await groupsCollection.updateOne(
          { _id: parsed_id },
          { $addToSet: { marknotes: note } }
        );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw "addNoteToGroup: Failed to add note to group";
  return await getGroupById(id.trim());
};

module.exports = {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroupById,
  deleteGroupById,
};

export {};
