import { useNavigate } from 'react-router-dom';
import { User, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const AuthButton = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Signed out',
      description: 'You have been signed out successfully.',
    });
  };

  if (loading) {
    return (
      <Button variant="ghost" size="sm" disabled className="opacity-50">
        <User className="w-4 h-4" />
      </Button>
    );
  }

  if (!user) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate('/auth')}
        className="border-border/50 hover:border-primary/40 hover:bg-primary/10"
      >
        <LogIn className="w-4 h-4 mr-2" />
        Sign In
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-border/50 hover:border-primary/40 hover:bg-primary/10"
        >
          <User className="w-4 h-4 mr-2" />
          <span className="max-w-[120px] truncate">{user.email}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
