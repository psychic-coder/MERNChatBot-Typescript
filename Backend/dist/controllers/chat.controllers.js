import User from "../models/User.js";
import { Mistral } from '@mistralai/mistralai';
// Assuming you have a User model in the models directory
export const generateChatCompletion = async (req, res, next) => {
    try {
        // const apiKey = process.env.MISTRAL_API_KEY || 'your_api_key';
        const client = new Mistral({
            apiKey: process.env.MISTRAL_API_KEY ?? "",
        });
        const { message } = req.body;
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res
                .status(401)
                .json({ message: "User not registered OR Token malfunctioned" });
        }
        const chats = user.chats.map(({ role, content }) => ({
            role: role,
            content,
        }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        // send all chats with the new one to Mistral API
        const chatResponse = await client.chat.complete({
            model: 'mistral-tiny',
            messages: chats,
        });
        // save response
        if (chatResponse?.choices && chatResponse.choices.length > 0) {
            const aiMessage = chatResponse.choices[0].message;
            if (aiMessage) {
                user.chats.push(aiMessage);
                await user.save();
                return res.status(200).json({ chats: user.chats });
            }
            else {
                return res.status(500).json({ message: "AI message is undefined" });
            }
        }
        else {
            return res.status(500).json({ message: "No response from Mistral AI" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: "Error in sendChatsToUser" });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: "error in deleteChats" });
    }
};
//# sourceMappingURL=chat.controllers.js.map