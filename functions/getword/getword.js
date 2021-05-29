async function hello() {
  return Promise.resolve("Hello World" + process.env.DEMO_VARIABLE);
}

exports.handler = async function(event, context) {
  try {
    const body = await hello();
    return { statusCode: 200, body };
  } catch(err) {
    return { statusCode: 500, body: err.toString() };
  }
};
