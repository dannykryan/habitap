/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
};
const withImages = require("next-images");

(module.exports = nextConfig), withImages();
// module.exports = {
//   async redirects() {
//     return [
//       {
//         source: "/",
//         destination: "/authentication",
//         permanent: false,
//       },
//     ];
//   },
// };
