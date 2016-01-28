/**
 * Created by kmironchyk on 12/8/2015.
 */
module.exports = {
  attributes: {
    sender: {
      model: "member"
    },
    text: 'string',
    recipients: {
      collection: "member"
    }
  }
}
