/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
};
const withImages = require("next-images");

(module.exports = {
  images: {
    domains: ['ibb.co'],
},
}), withImages();
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
