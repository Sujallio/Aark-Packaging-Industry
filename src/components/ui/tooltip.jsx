import React from 'react';

export const TooltipProvider = ({ children }) => <>{children}</>;
export const Tooltip = ({ children }) => <>{children}</>;
export const TooltipTrigger = React.forwardRef(({ ...props }, ref) => <div ref={ref} {...props} />);
export const TooltipContent = ({ ...props }) => <div {...props} />;

TooltipTrigger.displayName = "TooltipTrigger";
