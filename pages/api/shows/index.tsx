import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import type { Member } from '../../../types/Member';

// model shows {
//     showid             Int   @id
//     name               String   @db.VarChar(80)
//     season             String   @db.VarChar(80)
//     year               Int
//     descrip            String
//     memberid           String[]
//     showimageurl       String?
//   }

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET") {
        try {
            const {showid} = JSON.parse(req.body)
            const show = await prisma.shows.findUnique({
                where: {
                    showid: showid,
                },
            })
            console.log(show)
            return res.status(200).json({message: show.name});
        } catch (error) {
            res.status(400).json({message: `something went wrong: ${error}`})
        }
    }
    if (req.method == "POST") {
        // memberid is an array of strings
        const {name, season, year, descrip, memberid, showimageurl, showvideourl, youtubeid} = JSON.parse(req.body)
        var showid: number
        await prisma.$queryRaw`SELECT max(showid) FROM shows`.then(list => showid = list[0].max)

        const newShow = await prisma.shows.create({
            data: {
                showid: showid+1,
                name: name,
                season: season,
                year: year,
                descrip: descrip,
                memberid: memberid,
                showimageurl: showimageurl,
                showvideourl: showvideourl,
                youtubeid: youtubeid,
            },
        });
        console.log(newShow)
        res.status(200).json({message: "successfully created new show", showid: showid+1})
    }
    if (req.method == "DELETE") {
        try {
            const { showid } = JSON.parse(req.body)
            const deletedShow = await prisma.shows.delete({
                where: {
                    showid: showid,
                },
            });
            console.log(deletedShow)
            res.status(200).json({message: `successfully deleted user with memberid: ${showid}`})
        } catch (error) {
            res.status(400).json({message: `something went wrong: ${error}`})
        }
    }
    if (req.method == "PATCH") {
        // memberid is a string containing the memberids of all members in the show
        try {
            const {showid, name, season, year, descrip, memberid, showimageurl, showvideourl, youtubeid} = JSON.parse(req.body)
            const updatedShow = await prisma.shows.update({
                where: {
                    showid: showid,
                },
                data: {
                    name: name,
                    season: season,
                    year: year,
                    descrip: descrip,
                    memberid: memberid,
                    showimageurl: showimageurl,
                    showvideourl: showvideourl,
                    youtubeid: youtubeid,
                },
            });
            console.log(updatedShow)
            res.status(200).json({message: `successfully modified show with showid: ${showid} with the following data: ${season}, ${year}, ${descrip}, ${memberid}`})
        } catch (error) {
            res.status(400).json({message: `something went wrong: ${error}`})
        }
    }
}