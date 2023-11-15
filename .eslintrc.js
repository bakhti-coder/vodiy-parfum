module.exports = {
  plugin: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "warning",
    "simple-import-sort/imports": [
      "warning",
      {
        groups: [["^react"], ["^antd"], ["^@?\\w"], ["@/(.*)"], ["^[./]"]],
      },
    ],
  },
};
