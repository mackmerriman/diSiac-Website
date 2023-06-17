import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import type { Cloudinary } from '../../../types/Cloudinary';
import { isIP } from 'net';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    // if (req.method == "GET") {
    //     try {
    //         const {memberid} = JSON.parse(req.body)
    //         const member = await prisma.members.findUnique({
    //             where: {pages/api/cloudinaryct/index.ts
    //                 memberid: memberid,
    //             },
    //         })
    //         console.log(member)
    //         return res.status(200).json({message: member.name});
    //     } catch (error) {
    //         res.status(400).json({message: `something went wrong: ${error}`})
    //     }
    // }
    if (req.method == "POST") {
        try {
                //const id = String(req.query.id) 
            const {cloudinaryurl, resourcetitle, isimage} = JSON.parse(req.body)
            var cloudinaryid: number
            await prisma.$queryRaw`SELECT max(cloudinaryid) FROM cloudinary`.then(list => cloudinaryid = list[0].max)
            console.log(cloudinaryid)
            const newCloudinary = await prisma.cloudinary.create({
                data: {
                    cloudinaryid: cloudinaryid+1,
                    cloudinaryurl: cloudinaryurl,
                    resourcetitle: resourcetitle,
                    isimage: isimage,
                },
            });
            console.log(newCloudinary)
            res.status(200).json({message: "successfully created new Cloudinary", id: cloudinaryid+1, error: null})
        } catch (error) {
            res.status(400).json({message: `something went wrong: ${error}`, error: error})
        }
        
    }
    if (req.method == "DELETE") {
        try {
            const { cloudinaryid } = JSON.parse(req.body)
            const deletedCloudinary = await prisma.cloudinary.delete({
                where: {
                    cloudinaryid: cloudinaryid,
                },
            });
            console.log(deletedCloudinary)
            res.status(200).json({message: `successfully deleted user with cloudinaryid: ${cloudinaryid}`, error: null})
        } catch (error) {
            res.status(400).json({message: `something went wrong: ${error}`, error: error})
        }
    }
    if (req.method == "PATCH") {
        try {
            const {cloudinaryid, cloudinaryurl, resourcetitle, isimage} = JSON.parse(req.body)
            const updatedCloudinary = await prisma.cloudinary.update({
                where: {
                    cloudinaryid: cloudinaryid,
                },
                data: {
                    cloudinaryurl: cloudinaryurl,
                    resourcetitle: resourcetitle,
                    isimage: isimage,
                },
            });
            console.log(updatedCloudinary)
            res.status(200).json({message: `successfully modified cloudinary with cloudinaryid: ${cloudinaryid} with the following data: ${cloudinaryurl}, ${resourcetitle}`, error: null})
        } catch (error) {
            res.status(400).json({message: `something went wrong: ${error}`, error: error})
        }
    }
}                                                                                                                                                                                                                                                                                                                    