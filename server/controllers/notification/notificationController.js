import * as NotificationService from './notificationService.js'

export const addUserToSMTP = (req, res) => {
    var options = {
        'method': 'POST',
        'url': 'https://rapidemail.rmlconnect.net/v1.0/settings/addSmtp',
        'headers': {
        },
        body: `{\r\n    "owner_id": ${process.env.OWNER_ID},\r\n    "token":${process.env.TOKEN},\r\n    "total_limit":1000,\r\n    "hourly_limit":100\r\n}\r\n`

    };

    NotificationService.addUserToSMTP(options).then((data) => {
        res.status(200).json(data)
    })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: "Something went wrong!" })
        })
}
export const sendEmail = (req, res, roomId, email) => {
    var options = {
        'method': 'POST',
        'url': 'https://rapidemail.rmlconnect.net/v1.0/messages/sendMail',
        'headers': {
            'Reply-To': 'message.reply@example.com',
            'X-Unique-Id': 'id'
        },
        json: true,
        body: {
            "owner_id": "46875227",
            "token": "aZ4Voo7ssZNwnCdXxwWc0uwk",
            "smtp_user_name": "smtp56728640",
            "message": {
                "html": `The class has started! Please join the class by clicking on this link: http://class-it-up-brightestcrocodile-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/videoCall/${roomId}`,
                "text": "Please Join the meeting",
                "subject": "ClassRoom session Link",
                "from_email": "noreply@rapidemail.rmlconnect.net",
                "from_name": "ClassItUp",
                "to": email,
                "headers": {
                    "Reply-To": "noreply@rapidemail.rmlconnect.net",
                    "X-Unique-Id": "id "
                }
            }
        }


    };

    return NotificationService.sendEmail(options)
}


export const sendSms = (phone) => {
    var phone = phone
    var message = "The class has started. Please check your Email to join the meeting!"
    var options = {
        'method': 'GET',
        'url': `https://rapidapi.rmlconnect.net:9443/bulksms/bulksms?username=${process.env.USERNAME}&password=${process.env.PASSWORD}&type=0&dlr=0&destination=${phone}&source=RMLPRD&message=${message}`,
        'headers': {
        }
    };
    return NotificationService.sendSms(options)

}


export const sendViaWhatsapp = (phone, name) => {
    var options = {
        'method': 'POST',
        'url': 'https://rapidapi.rmlconnect.net/wbm/v1/message',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `${process.env.WHATSAPP_TOKEN}`
        },
        json: true,
        body: {
            "phone": "+919415552244",
            "media": {
                "type":
                    "media_template",
                "template_name":
                    "admission_confirmation",
                "lang_code": "en",
                "body": [
                    {
                        "text": "The meeting has started!!"
                    },
                    {
                        "text": "text"
                    },
                    {
                        "text": "date"
                    },
                    {
                        "text": "date"
                    },
                    {
                        "text": "text"
                    }
                ]
            }
        }

    };
    return NotificationService.sendViaWhatsapp(options)

}
