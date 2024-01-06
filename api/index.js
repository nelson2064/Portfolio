// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// require('dotenv').config();
// const path = require('path');

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static('public'));
// app.use('/assets', express.static(path.join(__dirname, 'assets')));

// // Serve the index.html file directly from the root URL
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.post('/send-email', (req, res) => {
//     const { name, email, subject, message } = req.body;

//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS,
//         },
//     });

//     // Acknowledgment email to the user
//     const acknowledgmentMailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'Thank you for contacting us!',
//         text: `Dear ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nYour Company`,
//         website:`https://www.grtr.online/, this is the our website from where we recive this email you have try to contact us from here though your email address `
//     };

//     // Notification email to the website owner
//     const notificationMailOptions = {
//         from: process.env.EMAIL_USER,
//         to: process.env.EMAIL_TO,
//         subject: subject,
//         text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
//     };

//     // Send acknowledgment email
//     transporter.sendMail(acknowledgmentMailOptions, (ackError, ackInfo) => {
//         if (ackError) {
//             console.error('Error sending acknowledgment email:', ackError);
//         } else {
//             console.log('Acknowledgment Email sent:', ackInfo.response);
//         }
//     });

//     // Send notification email to the website owner
//     transporter.sendMail(notificationMailOptions, (error, info) => {
//         if (error) {
//             console.error('Error sending email:', error);
//             return res.status(500).json({ error: 'Error sending email', details: error.message });
//         }
//         console.log('Email sent:', info.response);
//         res.status(200).json({ success: 'Email sent successfully' });
//     });
// });

// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });




const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('dist'));
app.use(express.static('public'));
app.use('/assets', express.static(path.join(__dirname, '../client/assets')));
app.use('/assets', express.static(path.join(__dirname, '../dist/assets')));

// Serve the index.html file directly from the root URL
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/client/index.html'));
// });

app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Acknowledgment email to the user
    const acknowledgmentMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for contacting us!',
        text: `Dear ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible. \nhttp://localhost:3000/, this is my website from where I receive this email you have try to contact us from here though your email address \n\n Best regards ,\n From Nelson Parajuli \n`,
        website:` `
    };

    // Notification email to the website owner
    const notificationMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    transporter.sendMail(acknowledgmentMailOptions, (ackError, ackInfo) => {
        if (ackError) {
            console.error('Error sending acknowledgment email:', ackError);
        } else {
            console.log('Acknowledgment Email sent:', ackInfo.response);
        }
    });

    // Send notification email to the website owner
    transporter.sendMail(notificationMailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Error sending email', details: error.message });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ success: 'Email sent successfully' });
    });
});



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
