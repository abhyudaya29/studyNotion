const nodeMailer=require('nodemailer')

const mailSender=async (email,title,body)=>{
    try{
        let transporter=nodeMailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }

        })
        let info=await transporter.sendMail({
            from:'StudyNotion || Chai Bytes-by Abhyudaya ',
            to:`${email}`,// list of receivers
            subject:`${title}`, // Subject line
            html:`${body}`
        })
        console.log(info);
        return info;

    }catch(error){
        console.log(error);
        throw Error
    }
}

module.exports=mailSender;