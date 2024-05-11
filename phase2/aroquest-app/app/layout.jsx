import NavBar from "@/app/common/NavBar";

export default function RootLayout({ children, isMainPage }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" />
      </head>
      <body>
        {children}
        {/* <NavBar isMainPage={isMainPage}/> */}
      </body>
    </html>
  );
}
