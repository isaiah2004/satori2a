import { LucideIcon } from 'lucide-react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarButtonProps extends ButtonProps {
  icon?: LucideIcon;
}

export function SidebarButton({
  icon: Icon,
  className,
  children,
  ...props
}: SidebarButtonProps) {
  return (
    <Button
      variant='ghost'
      className={cn('gap-2 justify-start rounded-xl hover:bg-white/10 text-gray-200 hover:text-white transition-all duration-200', className)}
      {...props}
    >
      {Icon && <Icon size={20} />}
      <span>{children}</span>
    </Button>
  );
}