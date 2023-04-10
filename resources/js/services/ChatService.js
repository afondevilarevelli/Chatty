import "axios";

export const ChatService = {
    newMessage: (text, to, type = "text", attachment = null) => {
        return window.axios.post("messages", {
            text: text,
            to: to,
            type: type,
            attachment: attachment,
        });
    },
};
