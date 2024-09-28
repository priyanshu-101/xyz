module.exports = {
    expo: {
      // Other Expo configuration
      metro: {
        config: {
          transformer: {
            // Specify file extensions to be handled
          },
          resolver: {
            sourceExts: ["js", "json", "ts", "tsx", "jsx", "vue"] // Add extensions here
          }
        }
      }
    }
  };
  
