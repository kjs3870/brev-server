import { Request, Response } from "express";
import Certification from "../../sequelize/models/certification.model";

const confirmCertNum = async (req: Request, res: Response) => {
  const { email, certNum } = req.params;
  try {
    const cert = await Certification.findOne({
      where: { email },
      order: [["createdAt", "desc"]],
      limit: 1,
    });

    if (Number(certNum) === cert.number) return res.json({ isCert: true });
    return res.json({ isCert: false });
  } catch (err) {
    return console.error(err);
  }
};

export default confirmCertNum;
