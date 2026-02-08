import cloudinary from "../lib/cloudinary.js";
import Message from "../models/MessageModel.js";
import User from "../models/UserModel.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error getting all contacts", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const getMessageByID = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;
    const messages = await Message.find({
      $or: [
        {
          senderId: myId,
          receiverId: userToChatId,
        },
        {
          senderId: userToChatId,
          receiverId: myId,
        },
      ],
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error in fetching all message by ID", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { text, image } = req.body;
    const senderId = req.user._id;

    let imageURl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageURl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      image: imageURl,
      text,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sending message", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllChats = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const messages = await Message.find({
      $or: [
        {
          senderId: loggedInUserId,
        },
        {
          receiverId: loggedInUserId,
        },
      ],
    });
    const chatPartnerIds = [...new Set(messages.map((msg) => msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()))];

    const chatPartners = await User.find({
      _id: { $in: chatPartnerIds },
    }).select("-password");
    res.status(200).json(chatPartners);
  } catch (error) {
    console.error("Error in finding chatPartners", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
