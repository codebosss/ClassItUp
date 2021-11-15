import * as VideoCallService from './videoCallService.js'
import * as NotificationController from '../notification/notificationController.js'
import * as NotificationService from '../notification/notificationService.js'
export const getRoom = (req, res) => {
    const roomId = req.params.id
    let options = {
        'method': 'GET',
        'url': `https://api.daily.co/v1/rooms/${roomId}`,
        'headers': {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.DAILY_API_KEY,
        },
    };

    VideoCallService.getRoom(options).then(async (room) => {
        if (room.error) {
            console.log("bye")
            let options = {
                'method': 'POST',
                'url': `https://api.daily.co/v1/rooms`,
                'headers': {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + process.env.DAILY_API_KEY,
                },
                'body': JSON.stringify({
                    name: roomId,
                    properties: {
                        enable_screenshare: true,
                        enable_chat: true,
                        start_video_off: true,
                        start_audio_off: false,
                        lang: "en",
                    },
                }),
            };
            VideoCallService.createRoom(options).then((newRoom) => {
                NotificationController.sendEmail(req, res, roomId)
                res.status(200).send(newRoom, { status: 200 });
            })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json({ message: "Something went wrong!" })
                })

        } else {
            console.log("hi")

            NotificationService.findStudents({ role: 'student' }).then(async (students) => {
                const email = students.map((student) => {
                    return {
                        email: student.email,
                        name: student.name,
                        type: "to"
                    }
                })
                const name = students.map((student) => {
                    return student.name
                })
                console.log(email, "////////")
                let phoneStr = ''
                const phone = students.map((student) => {
                    return phoneStr += student.phone + "%2C"
                })
                let number = phone[0].substring(0, phone[0].length - 3)
                await NotificationController.sendEmail(req, res, roomId, email)
                await NotificationController.sendSms(number)
                await NotificationController.sendViaWhatsapp(number, name)
                console.log("hhhh")
                res.status(200).send({ status: 200, room });
            })

        }
    })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: "Something went wrong!" })
        })
}

