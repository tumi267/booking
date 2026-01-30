import Nav from "../components/(public)/Nav/Nav"

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        
        <body >
        <Nav/>
          {children}
        </body>
      </html>
    )
  }
  