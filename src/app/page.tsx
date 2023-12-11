import FooterComponent from '@/components/footer'
import HeaderComponent from '@/components/header'
import { Button } from '@/components/ui/button'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 pt-24">
      <HeaderComponent/>
      
      <Button  size='sm' >Начать</Button>

      <FooterComponent/>
      

    </main>
  )
}
