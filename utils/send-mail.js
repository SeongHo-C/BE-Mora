const nodemailer = require('nodemailer');
const mjml2html = require('mjml');

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

// to: 발송할 메일 주소, subject: 발송할 메일 제목, text: 발송할 메일 내용
module.exports = (to, subject, text) => {
  const { html } = mjml2html(
    `
    <mjml>
  <mj-body>
    <mj-section>
      <mj-column background-color="#EEEAFE">
        <mj-image padding="1px 25px" src="https://api-test.emailbuilder.top/saemailbuilder/cee8d0e0-88a7-4799-865a-0d5b4b8cc736/images/5fccae12-86fc-4eaf-af7c-433199b43521/file.png" width="550px"></mj-image>
        <mj-text padding="29px 25px">
          <div style="text-align: center;"><font face="Comic Sans MS" color="#522BAE"><span style="font-size: xxx-large; background-color: rgba(0, 0, 0, 0);">All </span><span style="font-size: xxx-large; background-color: rgba(0, 0, 0, 0);">Write</span></font></div>
        </mj-text>
        <mj-spacer padding="5px 0px"></mj-spacer>
        <mj-text padding="35px 25px">
          <div style="text-align: center;"><span style="background-color: rgba(0, 0, 0, 0);"><font size="5" face="Comic Sans MS" color="#423F81">${subject}</font></span></div>
        </mj-text>
        <mj-text padding="26px 25px">
          <div style="text-align: center;"><span style="background-color: rgba(0, 0, 0, 0);"><font size="6" face="Comic Sans MS" color="#605EA0">${text}</font></span></div>
        </mj-text>
        <mj-spacer padding="17px 0px"></mj-spacer>
        <mj-text padding="1px 25px">
          <div style="text-align: center;"><span>&nbsp;</span><span style="background-color: rgba(0, 0, 0, 0); font-size: 12px; white-space: pre;">© AllWrite's Accountants Inc., All Rights Reserved.</span></div>
        </mj-text>
        <mj-image padding="0px 25px" src="http://www.moyeora-racer.com/static/media/main-banner-img.7e2e8f1a08b48ce93fe0.png"></mj-image>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
    `
  );

  new Promise((resolve, reject) => {
    const message = {
      from: `"Moyeora-Racer Team" <${process.env.NODEMAILER_USER}>`,
      to,
      subject,
      text,
      html: html,
    };

    transport.sendMail(message, (err, info) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(info);
    });
  });
};
