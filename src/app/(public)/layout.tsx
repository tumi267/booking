import Nav from "../components/(public)/Nav/Nav"

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      
        
        < >
        <Nav/>
          {children}
        </>
     
    )
  }
  