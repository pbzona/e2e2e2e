class ServerActionPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('ServerActionPlugin', (compilation, callback) => {
      for (const filename in compilation.assets) {
        if (filename.includes('server') && filename.endsWith('.js')) {
          const source = compilation.assets[filename].source();
          if (source.includes('__SERVER_ACTION__')) {
            console.log(`Server Action found in ${filename}`);
            // You can add more detailed logging here
          }
        }
      }
      callback();
    });
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: false
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new ServerActionPlugin());
    return config;
  },
};

export default nextConfig;
