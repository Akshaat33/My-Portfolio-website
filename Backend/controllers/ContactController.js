import ContactMessage from '../models/ContactMessage.js';

// CREATE CONTACT MESSAGE
const createMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate input
        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Save message in MongoDB
        const newMessage = await ContactMessage.create({
            name,
            email,
            message
        });

        res.status(201).json({
            success: true,
            message: 'Your message has been sent successfully!',
            data: newMessage
        });

    } catch (error) {
        console.error('Create Message Error:', error);

        res.status(500).json({
            success: false,
            message: 'Failed to send message'
        });
    }
};


// FETCH ALL CONTACT MESSAGES (ADMIN ONLY)
const getMessages = async (req, res) => {
    try {
        const messages = await ContactMessage.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: messages.length,
            data: messages
        });

    } catch (error) {
        console.error('Get Messages Error:', error);

        res.status(500).json({
            success: false,
            message: 'Failed to fetch messages'
        });
    }
};

// DELETE CONTACT MESSAGE (ADMIN ONLY)
const deleteMessage = async (req, res) => {
    try {
        const deletedMessage = await ContactMessage.findByIdAndDelete(req.params.id);

        if (!deletedMessage) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Message deleted successfully'
        });

    } catch (error) {
        console.error('Delete Message Error:', error);

        res.status(500).json({
            success: false,
            message: 'Failed to delete message'
        });
    }
};


export {
    createMessage,
    getMessages,
    deleteMessage
};