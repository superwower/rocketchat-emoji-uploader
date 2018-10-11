# rocketchat-emoji-uploader
Bulk upload custom emoji to RocketChat

# How to use
1. Clone this repository
1. Run `npm install` or `yarn`
1. Edit the following in index.js
  ```
  main(
    `INPUT_YOUR_ROCKETCHAT_HOST`,        // ex) localhost:3000
    `INPUT_YOUR_ROCKETCHAT_TOKEN`,       // ex) RATkNFc3ee8AHJ2BQf0t149lbwEhWeo2bSJLy2MpB-C"
    `INPUT_YOUR_CUSTOM_EMOJI_DIRECTORY`  // ex) /tmp/emoji
  );
  ``` 
1. Run `node index.js`
