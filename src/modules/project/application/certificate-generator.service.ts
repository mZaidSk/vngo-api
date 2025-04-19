import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

export const generateCertificate = async (
  userName: string,
  activityName: string,
): Promise<string> => {
  const fileName = `${userName.replace(/\s+/g, '_')}_${Date.now()}.pdf`;

  const certificatesDir = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'certificates',
  );
  if (!fs.existsSync(certificatesDir)) {
    fs.mkdirSync(certificatesDir, { recursive: true });
  }

  const filePath = path.join(certificatesDir, fileName);
  const doc = new PDFDocument({
    size: 'A4',
    layout: 'landscape',
    margin: 50,
  });

  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  // Background style shapes
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#f5f5f5');
  doc.fillColor('#0a1128');
  doc.polygon([0, 0], [150, 0], [0, 150]).fill();
  doc
    .polygon(
      [doc.page.width, 0],
      [doc.page.width - 150, 0],
      [doc.page.width, 150],
    )
    .fill();
  doc
    .polygon(
      [0, doc.page.height],
      [150, doc.page.height],
      [0, doc.page.height - 150],
    )
    .fill();
  doc
    .polygon(
      [doc.page.width, doc.page.height],
      [doc.page.width - 150, doc.page.height],
      [doc.page.width, doc.page.height - 150],
    )
    .fill();

  // Title
  doc
    .fillColor('#000')
    .fontSize(30)
    .font('Helvetica-Bold')
    .text('CERTIFICATE', { align: 'center' });
  doc.fontSize(14).text('OF APPRECIATION', { align: 'center' }).moveDown(2);

  // Subtitle
  doc
    .fontSize(16)
    .font('Helvetica')
    .text('PROUDLY PRESENTED TO', { align: 'center' })
    .moveDown(0.5);

  // Recipient name
  doc
    .fontSize(28)
    .font('Times-BoldItalic')
    .fillColor('#1a1a1a')
    .text(userName, { align: 'center', underline: true })
    .moveDown(1);

  // Description
  const pageWidth = doc.page.width;
  const boxWidth = 500;
  const x = (pageWidth - boxWidth) / 2;

  doc
    .fontSize(14)
    .font('Helvetica')
    .fillColor('#333')
    .text(
      `For successfully participating in the activity "${activityName}". We appreciate your contribution and enthusiasm.`,
      x, // x position
      undefined, // y position (auto)
      {
        align: 'center',
        width: boxWidth,
      },
    )
    .moveDown(2);

  // Date and Signature lines
  const y = doc.y + 40;
  doc.moveTo(150, y).lineTo(300, y).stroke();
  doc
    .moveTo(doc.page.width - 300, y)
    .lineTo(doc.page.width - 150, y)
    .stroke();

  doc
    .fontSize(12)
    .fillColor('#000')
    .text(`Date: ${new Date().toLocaleDateString()}`, 150, y + 10, {
      align: 'left',
    });
  doc.text('Signature', doc.page.width - 300, y + 10, {
    align: 'left',
  });

  // End
  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => resolve(`/certificates/${fileName}`));
    writeStream.on('error', (err) => reject(err));
  });
};
