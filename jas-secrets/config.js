// [DEMO] JAS Secrets — hard-coded GitHub PAT and Slack webhook (FAKE values).
// Frogbot should flag both tokens.

module.exports = {
  github: {
    // GitHub personal access token (classic) pattern: ghp_ + 36 chars
    token: "ghp_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  },
  // Generic API token embedded inline (high-entropy string)
  apiToken: "x7Qd9vKp2RmZ8YfBaH3uNs1Lo4WgT6ePjC0iVqM5",

  // Private key block in source
  privateKey: "-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAvF9D...TRUNCATED-FOR-DEMO...\n-----END RSA PRIVATE KEY-----",
};
