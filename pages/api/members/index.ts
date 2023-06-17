import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import type { Member } from '../../../types/Member';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET") {
        try {
            const {memberid} = JSON.parse(req.body)
            const member = await prisma.members.findUnique({
                where: {
                    memberid: memberid,
                },
            })
            console.log(member)
            return res.status(200).json({message: member.name});
        } catch (error) {
            res.status(400).json({message: `something went wrong: ${error}`})
        }
    }
    if (req.method == "POST") {
        //const id = String(req.query.id) 
        try {

        } catch (error) {
            res.status(400).json({message: "something went wrong", error: error})
        }
        const {email, name, memberid, bio, instagram, classyear, testimonialbio, headshoturl, testimonialurl} = JSON.parse(req.body)
        const newMember = await prisma.members.create({
            data: {
                memberid: memberid,
                name: name,
                email: email,
                bio: bio,
                classyear: classyear,
                testimonialbio: testimonialbio,
                headshoturl: headshoturl,
                instagram: instagram,
                testimonialurl: testimonialurl,
            },
        });
        console.log(newMember)
        res.status(200).json({message: "successfully created new member", error: null})
    }
    if (req.method == "DELETE") {
        try {
            const { memberid } = JSON.parse(req.body)
            const deletedMember = await prisma.members.delete({
                where: {
                    memberid: memberid,
                },
            });
            console.log(deletedMember)
            res.status(200).json({message: `successfully deleted user with memberid: ${memberid}`, error: null})
        } catch (error) {
            res.status(400).json({message: `something went wrong: ${error}`, error: error})
        }
    }
    if (req.method == "PATCH") {
        try {
            const {memberid, name, email, bio, instagram, testimonialbio, headshoturl, testimonialurl} = JSON.parse(req.body)
            const updatedMember = await prisma.members.update({
                where: {
                    memberid: memberid,
                },
                data: {
                    name: name,
                    email: email,
                    bio: bio,
                    instagram: instagram,
                    testimonialbio: testimonialbio,
                    headshoturl: headshoturl,
                    testimonialurl: testimonialurl,
                },
            });
            console.log(updatedMember)
            res.status(200).json({message: `successfully modified user with memberid: ${memberid} with the following data: ${name}, ${email}`, error: null})
        } catch (error) {
            res.status(400).json({message: `something went wrong: ${error}`, error: error})
        }
    }
}