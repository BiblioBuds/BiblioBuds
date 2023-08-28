// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// // import EmailProvider from "next-auth/providers/email";
// // import GoogleProvider from "next-auth/providers/google";

// export const authOptions = {
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     // EmailProvider({
//     //   server: process.env.EMAIL_SERVER,
//     //   from: process.env.EMAIL_FROM
//     // }),
//     // GoogleProvider({
//     //   clientId: process.env.GOOGLE_CLIENT_ID,
//     //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
//     // }),
//   ],
// }
// export default NextAuth(authOptions)
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)