import { Request, Response } from "express";
import sendEmail from "../sendEmail";
import Certification from "../../sequelize/models/certification.model";

const getRandomInt = (): number => {
  const min = Math.ceil(100000);
  const max = Math.floor(999999);
  return Math.floor(Math.random() * (max - min)) + min;
};

const deleteCertNumber = (email: string, number: number) => {
  Certification.destroy({ where: { email, number } })
    .then(() => console.log("cert num delete complete"))
    .catch((err) => console.error(err));
};

const sendCertNum = async (
  req: Request,
  res: Response
): Promise<Response<{ isSend: boolean }>> => {
  const { email } = req.params;
  const certNumber = getRandomInt();
  try {
    const isSend = await sendEmail(email, certNumber);

    if (isSend) {
      await Certification.create({ email, number: certNumber });
      setTimeout(deleteCertNumber, 3 * 60 * 1000, email, certNumber);
      return res.json({ isSend });
    }

    return res.sendStatus(500);
  } catch (err) {
    return res.json({ isSend: false });
  }
};

export default sendCertNum;
