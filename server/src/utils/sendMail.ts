import resend from "../configs/resend";
import { EMAIL_SENDER, NODE_ENV } from "../constants/env";

type params = {
    to: string,
    subject: string,
    text: string,
    html: string
}

const getFromAddress = () => NODE_ENV === "development" ? "onboarding@resend.dev" : EMAIL_SENDER;
const getToAddress = (to: string) => "delivered@resend.dev";

const sendMail = async({to, subject, text, html}: params) => {
    return await resend.emails.send({
        from: getFromAddress(),
        to: getToAddress(to),
        subject,
        text,
        html
    })
}

export default sendMail;