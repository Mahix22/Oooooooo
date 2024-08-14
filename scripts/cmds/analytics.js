const { createCanvas } = require('canvas');
const fs = require('fs-extra');
const path = require('path');

function gPC(data, oP) {
  const w = 1200;
  const h = 800;
  const cX = w / 2;
  const cY = h / 2;
  const r = Math.min(w - 300, h) / 2.5;

  const cvs = createCanvas(w, h);
  const ctx = cvs.getContext('2d');

  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, w, h);

  const sD = Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const t = sD.reduce((s, [_, v]) => s + v, 0);

  let sA = 0;

  ctx.fillStyle = '#333';
  ctx.font = 'bold 20px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('Command Ranking:', 20, 50);

  sD.forEach(([l, v], i) => {
    const sAng = (2 * Math.PI * v) / t;
    const clr = `hsl(${(i * 360) / sD.length}, 70%, 50%)`;

    ctx.beginPath();
    ctx.moveTo(cX, cY);
    ctx.arc(cX, cY, r, sA, sA + sAng);
    ctx.closePath();

    ctx.fillStyle = clr;
    ctx.fill();

    const mAng = sA + sAng / 2;
    const tR = r * 0.7;
    const tX = cX + Math.cos(mAng) * tR;
    const tY = cY + Math.sin(mAng) * tR;

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(l, tX, tY);
    ctx.fillText(v.toString(), tX, tY + 20);

    ctx.fillStyle = clr;
    ctx.fillRect(20, 70 + i * 35, 20, 20);
    ctx.fillStyle = '#333';
    ctx.textAlign = 'left';
    ctx.fillText(`${i + 1}. ${l}: ${v}`, 50, 85 + i * 35);

    sA += sAng;
  });

  ctx.fillStyle = '#333';
  ctx.font = 'bold 28px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Most Used Commands', w / 2, 40);

  const buf = cvs.toBuffer('image/png');
  fs.writeFileSync(oP, buf);

  return oP;
}

module.exports = {
  onStart: async function ({ event, message, globalData }) {
    try {
      const data = await globalData.get("analytics", "data");
      const oP = path.join(__dirname, "tmp", `${event.threadID}_piechart.png`);
      const cP = gPC(data, oP);
      await message.reply({ attachment: fs.createReadStream(cP) });
    } catch (e) {
      console.error(e);
      message.reply("Error: " + e.message);
    }
  },
  config: {
    name: "analytics",
    author: "Samir Œ" ,
    role: 0,
    description: "Analytics",
    category: "SYSTEM",
    guide: {
      en: "{pn} : will show the pie chart of commands usage information"
    }
  }
};
