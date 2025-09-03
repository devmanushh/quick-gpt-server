import axios from "axios"
import Chat from "../models/Chat.js"
import User from "../models/User.js"
import imagekit from "../configs/imagekit.js"   
import openai from '../configs/openai.js'


// text based ai chat msg controller
export const textMessageController = async(req, res)=>{
    try {
        const userId = req.user._id

        //check credits
        if(req.user.credits < 1){
            return res.json({success: false, message: "Not enough credits"})
        }

        const {chatId, prompt} = req.body

        const chat = await Chat.findOne({userId, _id: chatId})
        chat.messages.push({role:"user", content: prompt, timestamp: Date.now(), isImage: false})
    
        const {choices} = await openai.chat.completions.create({
        model: "gemini-1.5-flash",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    const reply = {...choices[0].message, timestamp: Date.now(), isImage: false}
    res.json({success: true, reply})
    
    chat.messages.push(reply)
    await chat.save()
    await User.updateOne({_id: userId}, {$inc: {credits: -1}})
    
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// image based ai chat msg controller
export const imageMessageController = async(req, res)=>{
    try {
        const userId = req.user._id;
        //check credits
        if(req.user.credits < 2){
            return res.json({success: false, message: "Not enough credits"})
        }
        const {chatId, prompt, isPublished} = req.body
        //find the particular chat
        const chat = await Chat.findOne({userId, _id: chatId})

        //push user msg
        chat.messages.push({
            role:"user", 
            content: prompt, 
            timestamp: Date.now(), 
            isImage: false, });

            //encode prompt
            const encodedPrompt = encodeURIComponent(prompt)

            //construct imagekit ai generation url - fix the URL format
            const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/${Date.now()}.png?tr=w-800,h-800`

            //call imagekit ai image generation api
            const aiImageResponse = await axios.get(generatedImageUrl, {responseType: "arraybuffer"})

            //convert to base 64
            const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data).toString('base64')}`

            //upload to imagekit lib
            const uploadResponse = await imagekit.upload({
                file: base64Image,
                fileName: `${Date.now()}.png`,
                folder: "/quickgpt"
            })

            const reply = {
                role: 'assistant',
                content: uploadResponse.url,
                timestamp: Date.now(), 
                isImage: true,
                isPublished
            }

            res.json({success: true, reply})

            chat.messages.push(reply)
            await chat.save()

            await User.updateOne({_id: userId}, {$inc: {credits: -2}})

        } catch (error) {
        res.json({success: false, message: error.message})
    }
}
