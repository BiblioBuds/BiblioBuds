// import { withAuth } from "next-auth/middleware"
// import prisma from "../lib/prisma"
// // middleware is applied to all routes, use conditionals to select

// export default withAuth(
//   function middleware (req) {
//   },
//   {
//     callbacks: {
//       authorized: async ({ req, token }) => {
//         const admin = await prisma.user.findUnique({
//             where: {
//               email: user.email,
//             }
//         })
//         console.log(admin)
//         if (
//           req.nextUrl.pathname.startsWith('/dashboard') &&
//           token !== null
//         ) {
//           return false
//         }
//         return true
//       }
//     }
//   }
// )