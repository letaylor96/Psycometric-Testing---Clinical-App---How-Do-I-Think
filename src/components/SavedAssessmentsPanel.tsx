import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { 
  Save, 
  History, 
  Trash2, 
  ChevronRight, 
  Crown, 
  Brain, 
  Sparkles,
  FileText,
  Clock,
  Edit3,
  Check,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useSavedAssessments, SavedAssessment, AssessmentTypeKey } from '@/hooks/useSavedAssessments';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { PremiumGate } from '@/components/PremiumGate';
import { assessmentInfo } from '@/data/assessmentTypes';

interface SavedAssessmentsPanelProps {
  onLoadAssessment?: (assessment: SavedAssessment) => void;
  currentType?: AssessmentTypeKey;
  className?: string;
}

const typeIcons: Record<AssessmentTypeKey, React.ReactNode> = {
  iq: <Brain className="w-4 h-4" />,
  personality: <Sparkles className="w-4 h-4" />,
  neurodivergent: <Brain className="w-4 h-4" />,
  depth: <FileText className="w-4 h-4" />,
};

const typeLabels: Record<AssessmentTypeKey, string> = {
  iq: 'IQ Assessment',
  personality: 'Personality Type',
  neurodivergent: 'Neurodivergence Level',
  depth: 'Psychoanalytical Analysis',
};

export function SavedAssessmentsPanel({ 
  onLoadAssessment, 
  currentType,
  className = '' 
}: SavedAssessmentsPanelProps) {
  const { savedAssessments, isLoading, deleteAssessment, updateAssessment } = useSavedAssessments();
  const { hasPremiumAccess, isLoading: premiumLoading } = usePremiumAccess();
  const [showPremiumGate, setShowPremiumGate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredAssessments = currentType 
    ? savedAssessments.filter(a => a.assessment_type === currentType)
    : savedAssessments;

  const handleLoadClick = (assessment: SavedAssessment) => {
    if (!hasPremiumAccess) {
      setShowPremiumGate(true);
      return;
    }
    onLoadAssessment?.(assessment);
  };

  const handleEditName = async (id: string) => {
    if (editName.trim()) {
      await updateAssessment(id, { name: editName.trim() });
    }
    setEditingId(null);
    setEditName('');
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmId) {
      await deleteAssessment(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const getAssessmentDisplayName = (assessment: SavedAssessment) => {
    if (assessment.name) return assessment.name;
    
    const date = format(new Date(assessment.created_at), 'MMM d, yyyy');
    const framework = assessment.framework 
      ? ` (${assessment.framework.charAt(0).toUpperCase() + assessment.framework.slice(1)})`
      : '';
    return `${typeLabels[assessment.assessment_type]}${framework} - ${date}`;
  };

  if (premiumLoading || isLoading) {
    return (
      <Card className={`bg-card/50 border-border/50 ${className}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 animate-spin" />
            <span>Loading saved assessments...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className={`bg-card/50 border-border/50 ${className}`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <History className="w-5 h-5 text-primary" />
            Saved Assessments
            {!hasPremiumAccess && (
              <Badge variant="secondary" className="ml-auto flex items-center gap-1">
                <Crown className="w-3 h-3" />
                Premium
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAssessments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Save className="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No saved assessments yet</p>
              <p className="text-xs mt-1">
                Complete an assessment to save your results for future comparison
              </p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <div className="space-y-2">
                {filteredAssessments.map((assessment, index) => (
                  <motion.div
                    key={assessment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div 
                      className={`
                        group relative p-3 rounded-lg border border-border/50 
                        hover:border-primary/30 hover:bg-primary/5 transition-all
                        ${!hasPremiumAccess ? 'opacity-75' : ''}
                      `}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {typeIcons[assessment.assessment_type]}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {editingId === assessment.id ? (
                            <div className="flex items-center gap-2">
                              <Input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                placeholder="Enter a name..."
                                className="h-7 text-sm"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleEditName(assessment.id);
                                  if (e.key === 'Escape') {
                                    setEditingId(null);
                                    setEditName('');
                                  }
                                }}
                              />
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-7 w-7"
                                onClick={() => handleEditName(assessment.id)}
                              >
                                <Check className="w-3 h-3" />
                              </Button>
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-7 w-7"
                                onClick={() => {
                                  setEditingId(null);
                                  setEditName('');
                                }}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <>
                              <p className="text-sm font-medium truncate">
                                {getAssessmentDisplayName(assessment)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {format(new Date(assessment.created_at), 'MMM d, yyyy • h:mm a')}
                              </p>
                            </>
                          )}
                        </div>

                        {/* Actions */}
                        {editingId !== assessment.id && (
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7"
                              onClick={() => {
                                setEditingId(assessment.id);
                                setEditName(assessment.name || '');
                              }}
                              title="Rename"
                            >
                              <Edit3 className="w-3 h-3" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 text-destructive hover:text-destructive"
                              onClick={() => setDeleteConfirmId(assessment.id)}
                              title="Delete"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 gap-1 text-primary"
                              onClick={() => handleLoadClick(assessment)}
                            >
                              Load
                              <ChevronRight className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Framework badge for depth psychology */}
                      {assessment.framework && (
                        <Badge 
                          variant="outline" 
                          className="absolute top-2 right-2 text-xs"
                        >
                          {assessment.framework}
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Saved Assessment?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this saved assessment and its answers. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Premium gate */}
      <PremiumGate
        isOpen={showPremiumGate}
        onClose={() => setShowPremiumGate(false)}
        onUnlocked={() => setShowPremiumGate(false)}
        feature="Saved Assessments"
        currentGameState="dashboard"
      />
    </>
  );
}
