import './globals.css';
import type { Metadata } from 'next';
export const metadata:Metadata={title:'ChargeShare | Your Home Charger. Everyone’s Charging Solution.',description:'Discover and book private EV home chargers around Chennai.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
