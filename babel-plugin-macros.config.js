let config = {};

const enviroment = process.env.NODE_ENV;

if (enviroment === "development") {
  config = {
    styledComponents: {
      pure: true,
      displayName: true,
      fileName: true,
      minify: false,
      transpileTemplateLiterals: false,
    },
  };
} else if (enviroment === "production") {
  config = {
    styledComponents: {
      pure: false,
      displayName: false,
      fileName: false,
      minify: true,
      transpileTemplateLiterals: true,
    },
  };
}

module.exports = config;
