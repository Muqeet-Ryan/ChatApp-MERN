import { resendClient, sender } from "../lib/resend.js"
import { createWelcomeEmailTemplate } from "./emailTemplates.js"

export const sendWelcomeEmail = async(email,name,clientURL) => {
    const {data, error} = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: 'Welcome to <RyansChatApp>',
        html: createWelcomeEmailTemplate(name,clientURL)
    });
    if(error){
        console.error(error, 'Error in sending email');
        throw new Error('Failed to send welcome email');
    } else {
        console.log('welcome email was sent successfully', data);
    }
};