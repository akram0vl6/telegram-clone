import { cn } from '@/lib/utils';
import React, { FC } from 'react'

interface Props {
    isReciving?: boolean;
}
const MeessageCard:FC<Props> = ({isReciving}) => {
  return (
    <div className={cn('m-2.5 font-medium text-xs flex', isReciving ? 'justify-start' : 'justify-end')}>
      <div className={cn('relative inline p-2 pl-2.5 pr-12 max-w-full', isReciving ? 'bg-primary' : 'bg-secondary/20')}>
        <p className='text-sm text-white '>Hellow</p>
        <span className='text-xs right-1 bottom-0 absolute opacity-60'>✓</span>
      </div>
    </div>
  )
}

export default MeessageCard