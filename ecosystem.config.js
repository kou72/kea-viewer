module.exports = {
  apps: [
    {
      name: "badkend",
      cwd: "./backend",
      script: "./kea-csv-reader.js",
    },
    {
      name: "frontend",
      cwd: "./frontend",
      script: "npm",
      args: "start",
    },
  ],
};
