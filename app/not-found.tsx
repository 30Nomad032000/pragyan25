import { Glitchy404 } from '@/components/ui/glitchy-404-1';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='h-screen flex items-center justify-center'>
            <Glitchy404 width={600} height={174} color="#fff" />

        </div>
    );
}