import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    try {
      const { conceptvideoid } = JSON.parse(req.body);
      const conceptual = await prisma.conceptvideos.findUnique({
        where: {
          conceptvideoid: conceptvideoid,
        },
      });
      console.log(conceptual);
      return res.status(200).json({ message: conceptual.name });
    } catch (error) {
      res.status(400).json({ message: `something went wrong: ${error}` });
    }
  }
  if (req.method == "POST") {
    const {
      name,
      choreoid,
      season,
      year,
      memberid,
      description,
      youtubelink,
      thumbnailurl,
    } = JSON.parse(req.body);
    var conceptvideoid: number
    await prisma.$queryRaw`SELECT max(conceptvideoid) FROM conceptvideos`.then(list => conceptvideoid = list[0].max)
    const newConceptual = await prisma.conceptvideos.create({
      data: {
        conceptvideoid: conceptvideoid+1,
        name: name,
        choreoid: choreoid,
        season: season,
        year: year,
        memberid: memberid,
        description: description,
        youtubelink: youtubelink,
        thumbnailurl: thumbnailurl,
      },
    });
    console.log(newConceptual);
    res.status(200).json({ message: "successfully created new conceptual" });
  }
  if (req.method == "DELETE") {
    try {
      const { conceptvideoid } = JSON.parse(req.body);
      const deletedConceptual = await prisma.conceptvideos.delete({
        where: {
          conceptvideoid: conceptvideoid,
        },
      });
      console.log(deletedConceptual);
      res.status(200).json({
        message: `successfully deleted conceptual with id: ${conceptvideoid}`,
      });
    } catch (error) {
      res.status(400).json({ message: `something went wrong: ${error}` });
    }
  }
  if (req.method == "PATCH") {
    try {
      const {
        conceptvideoid,
        name,
        choreoid,
        season,
        year,
        memberid,
        description,
        youtubelink,
        thumbnailurl,
      } = JSON.parse(req.body);
      const updatedConceptual = await prisma.conceptvideos.update({
        where: {
          conceptvideoid: conceptvideoid,
        },
        data: {
          name: name,
          choreoid: choreoid,
          season: season,
          year: year,
          memberid: memberid,
          description: description,
          youtubelink: youtubelink,
          thumbnailurl: thumbnailurl,
        },
      });
      console.log(updatedConceptual);
      res.status(200).json({
        message: `successfully modified conceptual with id: ${conceptvideoid}`,
      });
    } catch (error) {
      res.status(400).json({ message: `something went wrong: ${error}` });
    }
  }
}
