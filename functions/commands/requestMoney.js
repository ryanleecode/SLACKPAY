const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const clientFactory = require('../../helpers/clientFactory.js');
const message = require('../../utils/message.js');

const addContact = require('./addcontact.js');

/**
* /addContact
*
*   Adds a contact in the Interact API
*   All Commands use this template, simply create additional files with
*   different names to add commands.
*
*   See https://api.slack.com/slash-commands for more details.
*
* @param {string} user The user id of the user that invoked this command (name is usable as well)
* @param {string} channel The channel id the command was executed in (name is usable as well)
* @param {string} text The text contents of the command
* @param {object} command The full Slack command object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/
module.exports = async (user, channel, text = '', command = {}, botToken = null) => {
  message(botToken, channel, 'Okay. Adding ' + text + ' to contacts.', () => {});
  const client = await clientFactory();
  let responseText = text + ' was added to contacts.';
  try {
    const response = await client.post('/money-requests/send/', {
      "sourceMoneyRequestId": "sourceidxxx",
      "requestedFrom": {
            "contactId": "CAxRANd0MtqJ",
            "contactHash": "64bc000a103n8621ot9he6r48rd8a999"
        },
      "amount": 400,
      "currency": "CAD",
      "editableFulfillAmount": false,
      "expiryDate": "2018-01-30T16:12:12.721Z",
      "supressResponderNotifications": false
    });  
  } catch (err) {
    responseText = 'Could not add' + text + 'as a contact.';
  }
  const result = {
    text: responseText,
    attachments: [
      // You can customize your messages with attachments.
      // See https://api.slack.com/docs/message-attachments for more info.
    ]
  };
  return result;
};