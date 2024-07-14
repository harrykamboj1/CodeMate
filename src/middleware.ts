export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/your-rooms", "/create-room", "/rooms", "/browse", "/edit-room"],
};
