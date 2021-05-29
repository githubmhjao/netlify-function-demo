const randomWords = require("random-words");

async function getWord() {
  return Promise.resolve(`${process.env.DEMO_VARIABLE}\n${randomWords().toUpperCase()}`);
}

exports.handler = async function(event, context) {
  try {
    const body = await getWord();
    return { statusCode: 200, body };
  } catch(err) {
    return { statusCode: 500, body: err.toString() };
  }
};
