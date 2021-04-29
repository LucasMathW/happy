import nodemailer, {Transporter} from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'

class SendMailService {
  private client: Transporter;

  constructor(){
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });
      this.client = transporter
    })
  }

  async execute(to: string, subject: string, variables: Object, path: string){
    const fileTemplateContent = fs.readFileSync(path).toString('utf8')
    const mailTemplateParser = handlebars.compile(fileTemplateContent)
    const html = mailTemplateParser(variables)

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: 'NPS <lucas.alencar@nps.com.br>'
    })

    console.log(`Message send: ${message.messageId}`)
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`)
  }
}

export default new SendMailService()
