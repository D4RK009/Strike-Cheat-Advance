
import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Palette, Shuffle, Check, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ThemeSwitcher: React.FC = () => {
  const { currentTheme, availableThemes, setTheme, generateRandomTheme, resetToDefault } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          style={{
            background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.primaryLight})`,
            borderColor: currentTheme.border,
          }}
        >
          <Palette className="h-4 w-4" style={{ color: currentTheme.foreground }} />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0" 
        style={{
          backgroundColor: currentTheme.card,
          borderColor: currentTheme.border,
        }}
        align="end"
        sideOffset={8}
      >
        <Card 
          className="border-none shadow-none"
          style={{ backgroundColor: 'transparent' }}
        >
          <CardHeader className="pb-2 px-3 pt-3">
            <CardTitle 
              className="flex items-center gap-2 text-base"
              style={{ color: currentTheme.foreground }}
            >
              <Palette className="h-4 w-4" />
              Theme Selector
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 px-3 pb-3">
            <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto">
              {availableThemes.map((theme) => (
                <Button
                  key={theme.name}
                  variant="outline"
                  className={cn(
                    "flex flex-col items-start p-2 h-auto relative min-h-[50px] hover:opacity-80",
                    currentTheme.name === theme.name && "ring-1"
                  )}
                  style={{
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                    color: theme.foreground,
                    ringColor: theme.primary,
                  }}
                  onClick={() => {
                    setTheme(theme);
                    setIsOpen(false);
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-medium truncate max-w-[90px]">{theme.name}</span>
                    {currentTheme.name === theme.name && (
                      <Check 
                        className="h-3 w-3 flex-shrink-0" 
                        style={{ color: theme.primary }}
                      />
                    )}
                  </div>
                  <div className="flex gap-1 mt-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme.accent }}
                    />
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme.primaryLight }}
                    />
                  </div>
                </Button>
              ))}
            </div>
            
            <div className="pt-2 border-t space-y-2" style={{ borderColor: currentTheme.border }}>
              <Button
                onClick={() => {
                  generateRandomTheme();
                  setIsOpen(false);
                }}
                className="w-full h-8 text-xs"
                style={{
                  backgroundColor: currentTheme.primary,
                  color: currentTheme.foreground,
                }}
              >
                <Shuffle className="h-3 w-3 mr-1" />
                Generate Random
              </Button>
              <Button
                onClick={() => {
                  resetToDefault();
                  setIsOpen(false);
                }}
                variant="outline"
                className="w-full h-8 text-xs"
                style={{
                  borderColor: currentTheme.border,
                  color: currentTheme.foreground,
                  backgroundColor: 'transparent',
                }}
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Reset to Default
              </Button>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
