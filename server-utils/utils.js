function logErrorMessage(msg, err = null) {
  console.log(msg);
  if (err) {
    console.log(err);
  }
}

module.exports = logErrorMessage;
