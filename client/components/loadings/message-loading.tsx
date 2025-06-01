import { cn } from '@/lib/utils';
import React, { FC } from 'react'
import { Skeleton } from '../ui/skeleton';

interface Props {
    isReciving?: boolean;
}

const MessageLoading: FC<Props> = ({isReciving}) => {
  return (
    <div className={cn('m-2.5 font-medium text-xs flex', isReciving ? 'justify-start' : 'justify-end')}>
			<Skeleton className={cn('relative inline p-2 pl-2.5 pr-12', isReciving ? 'bg-primary/20' : 'bg-secondary/20')}>
				<Skeleton className='w-36 h-5' />
				<span className='text-xs right-1 bottom-0 absolute opacity-60'>✓</span>
			</Skeleton>
    </div>
  )
}

export default MessageLoading