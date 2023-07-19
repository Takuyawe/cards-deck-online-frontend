import Image from 'next/image'
import CircleMenuComponent from "@/app/_components/CircleMenu/CircleMenuComponent"
import CardsDeck from '@/app/_components/Card/CardsDeck'
import TopRightButtonsComponent from './TopRightButtons/TopRightButtonsComponent'

export default function PlayBoard() {
  return (
    <div className="relative w-screen h-screen">
      <Image src="/casino_table.jpg" alt="table" fill style={{ objectFit: "cover", zIndex: -999}} />
      <CardsDeck />
      <CircleMenuComponent />
      <TopRightButtonsComponent />
    </div>
  )
}