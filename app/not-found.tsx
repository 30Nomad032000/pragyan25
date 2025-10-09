import { Glitchy404 } from '@/components/ui/glitchy-404-1';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-black'>
            <div className="w-full max-w-4xl flex justify-center">
                <Glitchy404 color="#fff" />
            </div>
        </div>
    );
}