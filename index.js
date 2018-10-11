const W3CWebSocket = require(`websocket`).w3cwebsocket;
const WebSocketAsPromised = require(`websocket-as-promised`);

const fs = require(`fs`);
const path = require(`path`);

const main = async (host, resume, emojiDir) => {
  const wsp = new WebSocketAsPromised(`ws://${host}/websocket`, {
    createWebSocket: url => new W3CWebSocket(url),
    packMessage: data => JSON.stringify(data),
    unpackMessage: message => JSON.parse(message),
  });
  // wsp.onUnpackedMessage.addListener(data => console.log(data));
  let methodId = 1;

  await wsp.open();
  await wsp.sendPacked({
    msg: `connect`,
    version: `1`,
    support: [`1`, `pre2`, `pre1`],
  });
  await wsp.sendPacked({
    msg: `method`,
    method: `login`,
    params: [{ resume }],
    id: `${methodId++}`,
  });

  const emojiFiles = fs.readdirSync(emojiDir);
  for (const emojiFile of emojiFiles) {
    console.log(`uploading... ${emojiFile}`)
    const ext = path.extname(emojiFile);
    const filename = path.basename(emojiFile, ext);

    await wsp.sendPacked({
      msg: `method`,
      method: `insertOrUpdateEmoji`,
      params: [
        {
          name: filename,
          aliases: ``,
          newFile: true,
          extension: ext.substr(1),
        },
      ],
      id: `${methodId++}`,
    });

    await wsp.sendPacked({
      msg: `method`,
      method: `uploadEmojiCustom`,
      params: [
        fs.readFileSync(path.join(emojiDir, emojiFile)).toString(`binary`),
        `image/${ext.substr(1)}`,
        {
          name: filename,
          aliases: ``,
          newFile: true,
          extension: ext.substr(1),
        },
      ],
      id: `${methodId++}`,
    });
    console.log(`uploading... ${emojiFile} done`)
  }
  wsp.close();
};

main(
  `INPUT_YOUR_ROCKETCHAT_HOST`,
  `INPUT_YOUR_ROCKETCHAT_TOKEN`,
  `INPUT_YOUR_CUSTOM_EMOJI_DIRECTORY`
);
