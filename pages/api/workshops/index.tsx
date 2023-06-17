import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// model workshops {
//   workshopid         Int   @id
//   choreoid           String
//   title              String
//   season             String   @db.VarChar(80)
//   year               Int
//   youtubelink        String
//   workshopimageid    Int?
// }

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    try {
      const { workshopid } = JSON.parse(req.body);
      const workshop = await prisma.workshops.findUnique({
        where: {
          workshopid: workshopid,
        },
      });
      console.log(workshop);
      return res.status(200).json({ message: workshop.title });
    } catch (error) {
      res.status(400).json({ message: `something went wrong: ${error}` });
    }
  }
  if (req.method == "POST") {
    const { choreoid, title, season, yearseasonid, youtubelink } =
      JSON.parse(req.body);
      var workshopid: number
      await prisma.$queryRaw`SELECT max(workshopid) FROM workshops`.then(list => workshopid = list[0].max)
    const newWorkshop = await prisma.workshops.create({
      data: {
        workshopid: workshopid+1,
        choreoid: choreoid,
        title: title,
        season: season,
        yearseasonid: yearseasonid,
        youtubelink: youtubelink,
      },
    });
    console.log(newWorkshop);
    res.status(200).json({ message: "successfully created new workshop", workshopid: workshopid+1 });
  }
  if (req.method == "DELETE") {
    try {
      const { workshopid } = JSON.parse(req.body);
      const deletedWorkshop = await prisma.workshops.delete({
        where: {
          workshopid: workshopid,
        },
      });
      console.log(deletedWorkshop);
      res.status(200).json({
        message: `successfully deleted workshop with workshopid: ${workshopid}`,
      });
    } catch (error) {
      res.status(400).json({ message: `something went wrong: ${error}` });
    }
  }
  if (req.method == "PATCH") {
    try {
      const { workshopid, choreoid, title, season, yearseasonid, youtubelink } =
        JSON.parse(req.body);
      const updatedWorkshop = await prisma.workshops.update({
        where: {
          workshopid: workshopid,
        },
        data: {
          choreoid: choreoid,
          title: title,
          season: season,
          youtubelink: youtubelink,
          yearseasonid: yearseasonid,
        },
      });
      console.log(updatedWorkshop);
      res.status(200).json({
        message: `successfully modified workshop with workshopid: ${workshopid} with the following data: ${season}, ${choreoid}, ${youtubelink}`,
      });
    } catch (error) {
      res.status(400).json({ message: `something went wrong: ${error}` });
    }
  }
}
