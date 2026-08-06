module.exports = {
  root: true,
  // Extend our shared internal package
  extends: ["@g-scores/eslint-config"],
  // Ignore workspaces by default here so they can define their own rules if needed
  ignorePatterns: ["apps/**", "packages/**"],
};
