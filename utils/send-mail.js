const nodemailer = require('nodemailer');
const mjml2html = require('mjml');
const logger = require('../logger');

const mailSender = {
  sendGmail(to, subject, text, content) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      prot: 587,
      host: 'smtp.gmlail.com',
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const { html } = mjml2html(
      `
      <mjml>
        <mj-body>
          <mj-section>
            <mj-column background-color="#EEEAFE">
              <mj-text padding="29px 25px">
                <mj-image padding="0px 25px"width="100px" src="" alt="logo"></mj-image>
              </mj-text>
              <mj-spacer padding="5px 0px"></mj-spacer>
              <mj-text padding="35px 25px">
                <div style="text-align: center;"><span style="background-color: rgba(0, 0, 0, 0);"><font size="6" face="Comic Sans MS" color="#423F81">${text}</font></span></div>
              </mj-text>
              <mj-text>
                <div style="text-align: center; background:#ffffff; padding: 20px; border-radius: 5px; margin: 0 30px;"><span><font size="5" face="Comic Sans MS" color="#605EA0">${content}</font></span></div>
              </mj-text>
              <mj-spacer padding="17px 0px"></mj-spacer>
              <mj-image padding="0px 25px" width="400px"src="http://www.moyeora-racer.com/static/media/main-banner-img.7e2e8f1a08b48ce93fe0.png"></mj-image>
              <mj-spacer padding="17px 0px"></mj-spacer>
              <mj-text padding="1px 25px">
                <div style="text-align: center;"><span>&nbsp;</span><span style="background-color: rgba(0, 0, 0, 0); font-size: 12px; white-space: pre;">Copyright ⓒ 2023 - 2023 Moyeora Elice Inc. All Rights Reserved.</span></div>
              </mj-text>
                <mj-spacer padding="10px 0px"></mj-spacer>
            </mj-column>
          </mj-section>
        </mj-body>
  </mjml>
      `
    );

    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to,
      subject,
      text,
      content,
      html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        logger.error(error);
      } else {
        logger.info('Email sent: ' + info.response);
      }
    });
  },
};

module.exports = mailSender;
